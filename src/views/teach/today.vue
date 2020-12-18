<template>
    <div>
    <form-preview v-for="(item,index) in list" :header-label="item.studentname" :header-value="item.date" :body-items="info[index]" :key="index"></form-preview>
    <br>
  </div>
</template>

<script>
import { FormPreview } from 'vux'
import moment from 'moment'
export default {
  components: {
    FormPreview
  },
  data () {
    return {
      list:[],//所有排课
      info:[],//页面显示信息
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList() {
      console.log(this.$store.getters)
      this.$http.get('http://139.199.168.158:8080/admin/teacher_allevents?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         console.log(response)
         if (response.code === 1) {
           console.log('获取排课记录成功')
           for(var i = 0 ; i < response.data.length ; i++){
               if(moment(response.data[i].COURSE_TIME).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                  let temp={
                    date:moment(response.data[i].COURSE_TIME).format          ('YYYY-MM-DD'),
                    studentname:response.data[i].STUDENT_NAME,
                  }
                  this.info.push(
                  [           
                      {
                          label:'时间：',
                          value:moment(response.data[i].COURSE_TIME)   .format('HH:mm:ss')
                      },
                      {
                          label:'课程：',
                          value:response.data[i].SUBJECT_NAME
                      },
                      {
                          label:'教室：',
                          value:response.data[i].ROOM_ID
                      },
                  ])
                this.list.push(temp)  
               }           
          }
         }
         else{
           console.log('排课记录失败')
         }
    })
    this.$http.get('http://139.199.168.158:8080/admin/teacher_homework?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         console.log(response)
         if (response.code === 1) {
           console.log('获取作业成功')
          //  this.eventlist=response.data
           console.log(response)
           for(var i = 0 ; i < response.data.length ; i++){
               if(moment(response.data[i].SUBMISSION_DATE).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                  let temp={
                    date:moment(response.data[i].SUBMISSION_DATE).format          ('YYYY-MM-DD'),
                    studentname:response.data[i].STUDENT_NAME,
                  }
                  this.info.push(
                  [           
                      {
                          label:'ID：',
                          value:response.data[i].HOMEWORK_ID
                      },
                      {
                          label:'课程：',
                          value:response.data[i].SUBJECT_NAME
                      },
                  ])
                this.list.push(temp)  
               }           
          }
         }
         else{
           console.log('获取作业失败')
         }
    })
    },
  }
}
</script>