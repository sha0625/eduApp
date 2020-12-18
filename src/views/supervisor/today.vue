<template>
    <div>
    <tab>
      <tab-item v-for="(item,index) in student" :key="item.id" @on-item-click="click">{{item.title}}</tab-item>
    </tab>
    <x-button type="primary" v-if="studentid" :disabled="attendanceState == 2 " @click.native="attendance">{{attendanceText}}</x-button>
    <form-preview v-for="(item,index) in list" :header-label="item.studentname" :header-value="item.coursetime" :footer-buttons="buttons" :body-items="info[index]" :key="index" :name="item.param"></form-preview>
    <br>
  </div>
</template>

<script>
import { XButton, Tab, TabItem, FormPreview } from 'vux'
import moment from 'moment'
export default {
  components: {
    XButton,
    TabItem, 
    Tab,
    FormPreview
  },
  data () {
    return {
      list:[],//所有显示排课
      listOrigin:[],//所有原始排课
      info:[],//页面显示信息
      infoOrigin:[],//页面原始信息
      studentid:'',//当前学生id
      studentname:'',//当前学生name
      student:[],//所有学生
      attendanceText:'',//考勤状态文字
      attendanceState:'',//考勤状态
      buttons: [{
        style: 'default',
        text: '详情',
        onButtonClick: (name) => {
          console.log(name)
          this.$router.push({
                // path: '/home'
                path: '/supervisor-course-check',
                query:name
          });
        }
      }],//课程操作
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList() {
       this.$http.get('http://139.199.168.158:8080/admin/supervisormystudents?supervisorname='+this.$store.getters.username).then((response) => {
         response = response.data
         if (response.code === 1) {
           console.log('获取学生列表成功')
           for(var i = 0 ; i < response.data.length ; i++){
             this.student.push(
               {
                  title: response.data[i].name,
                  id: response.data[i].id,//学生id
                  type:response.data[i].type,
               }
             )
           }
         }
         else{
           console.log('获取学生列表失败')
         }
        }) 
      this.$http.get('http://139.199.168.158:8080/admin/supervisor_today?id='+this.$store.getters.userid).then((response) => {
        console.log(response)
         response = response.data
         if (response.code === 1) {
           console.log('获取排课记录成功')
           for(var i = 0 ; i < response.data[0].length ; i++){
           let temp={
             studentname:response.data[0][i].STUDENT_NAME,
             coursetime:moment(response.data[0][i].COURSE_TIME).format('HH:mm:ss'),
             studentid:response.data[0][i].STUDENT_ID,
             param:{
                       id:response.data[0][i].id,
             }//切换router时的参数
           }
           this.info.push(
           [           
               {
                   label:'课程：',
                   value:response.data[0][i].SUBJECT_NAME
               },
               {
                   label:'教师：',
                   value:response.data[0][i].TEACHER_NAME
               },
               {
                   label:'教室：',
                   value:response.data[0][i].ROOM_ID
               },               
           ])
           this.list.push(temp)   
          }
          this.listOrigin = this.list.slice(0)
          this.infoOrigin = this.info.slice(0)
         }
         else{
           console.log('排课记录失败')
         }
    })
    },  
    click(index){
      console.log(this.student[index].id)
      this.list = []
      this.info = []
      this.studentid = this.student[index].id
      this.studentname = this.student[index].studentname
      for(var i = 0 ; i < this.listOrigin.length ; i++){
         if(this.listOrigin[i].studentid == this.studentid){
            this.list.push(this.listOrigin[i])
            this.info.push(this.infoOrigin[i])
         }
      }
      this.$http.get('http://139.199.168.158:8080/admin/supervisor_get_attendance?studentid='+this.studentid).then((response) => {
        console.log(response)
         response = response.data
         if (response.data.length == 0 ) {
           console.log('未考勤')
           this.attendanceText = '开始'
           this.attendanceState = 0
         }
         else if (response.data.length > 0) {
           if(!response.data.END){
              console.log('已开始')
              this.attendanceText = '结束'
              this.attendanceState = 1
           }
           else{
             this.attendanceText = '已结束'
             this.attendanceState = 2
           }
         }
         else{
           console.log('考勤失败')
         }
        }) 
    },
    attendance(){
      switch(this.attendanceState){
        case 0 :
         this.attendanceState = 1
         this.attendanceText = '结束'
         break;
        case 1 :
         this.attendanceState = 2
         this.attendanceText = '已结束'
      }
      this.$http.post('http://139.199.168.158:8080/admin/supervisor_post_attendance', {
        time:moment().format('YYYY-MM-DD HH:mm:ss'),
        supervisorid:this.$store.getters.userid,
        supervisorname:this.$store.getters.username,
        studentid:this.studentid,
        studentname:this.studentname,
        state:this.attendanceState 
        }).then((response) => {
        console.log(response)
         response = response.data
         if (response.code === 1) {
           console.log('更新考勤成功')
         }
         else{
           console.log('更新考勤失败')
         }
        }) 
    }
  }
}
</script>