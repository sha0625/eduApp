<template>
<div>
    <group title="授课反馈">    
      <cell title="授课内容"></cell>
      <x-textarea disabled :value="course.COURSE_CONTENT"></x-textarea>
      <cell title="课堂表现"></cell>
      <x-textarea disabled :value="course.COURSE_PERFORMANCE"></x-textarea>
      <cell title="上次作业问题"></cell>
      <x-textarea disabled :value="course.HMPROBLEM"></x-textarea>
      <cell title="提升建议"></cell>
      <x-textarea disabled :value="course.PROPOSAL"></x-textarea>
    </group>
    <group title="作业">    
      <form-preview v-for="(item,index) in homework" :header-label="item.HOMEWORK_ID"   :body-items="homework_info[index]" :key="index"></form-preview>
    </group>
</div>
</template>
<script>
import { Cell, Group, TransferDom, XTextarea, XButton, FormPreview } from 'vux'
import moment from 'moment'
export default {
  directives: {
    TransferDom,
  },
  components: {
    XButton,
    XTextarea,
    Cell, 
    Group,
    FormPreview
  },
  data(){
      return{
          course:'',//课程信息
          homework:'',//作业列表
          homework_info:[],//作业详情
          HomeworkID:'',//新作业的id
          total:0,
          edit:false,//修改开关
      }
  },
  created(){
        this.getlist()
  },
  methods:{
      getlist(){
          this.$http.get('http://139.199.168.158:8080/admin/coursecheck?eventid='+this.$route.query.value1).then((response) => {
            if(response.data.code == 1){
              console.log('获取课程信息成功')
              this.course = response.data.data[0];
            }
            else
              console.log('获取课程信息失败')
          })
          this.$http.get('http://139.199.168.158:8080/admin/eventhomework?eventid='+this.$route.query.value1).then((response) => {
          response = response.data;
          if (response.code === 1) {
            this.homework = response.data
            for(var i = 0 ; i < this.homework.length ; i++){
              this.homework[i].SUBMISSION_DATE = moment(this.homework[i].SUBMISSION_DATE).format('YYYY-MM-DD')
              this.homework_info.push([
                {
                  label:'布置时间：',
                  value:moment(this.homework[i].ARRANGEMENT_DATE).format('YYYY-MM-DD   HH:mm:ss')
                },
                {
                  label:'规定提交时间：',
                  value:moment(this.homework[i].ARRANGEMENT_DATE).format('YYYY-MM-DD   HH:mm:ss')
                },
                {
                  label:'作业内容：',
                  value:this.homework[i].CONTENT
                },
                {
                  label:'作业目标：',
                  value:this.homework[i].OBJECTIVE
                },
                {
                  label:'规定用时：',
                  value:this.homework[i].USE_TIME
                },
              ])
            }
            let letter = String.fromCharCode(this.homework.length+65); 
            this.HomeworkID=this.course.STUDENT_NAME+'-'+this.course.SUBJECT_NAME+'-'+this.$route.query.value2.substr(0,this.$route.query.value2.length-1)+'-'+letter
            console.log("获取作业信息成功")
            } else {
                  // this.$popup({
                  //   message: response.msg,
                  //   color: '#ee2126',
                  //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  //   delay: 5
                  // });
              console.log("获取作业信息失败")
            }
          });
      },
  }
}
</script>