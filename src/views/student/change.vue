<template>
    <div>
    <form-preview v-for="(item,index) in list" :header-label="item.label" :header-value="item.subject" :body-items="info[index]" :key="index"></form-preview>
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
      this.$http.get('http://139.199.168.158:8080/admin/student_change?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         console.log(response)
         if (response.code === 1) {
           console.log('获取改课记录成功')
           for(var i = 0 ; i < response.data.length ; i++){
           let temp={
             date:moment(response.data[i].SUBMISSION_DATE).format('YYYY-MM-DD'),
             label:response.data[i].APPLY_TYPE,
             subject:response.data[i].SUBJECT,
           }
           switch(response.data[i].APPLY_TYPE){
               case '更改':
                   this.info.push(
                   [           
                   {
                       label:'申请类型：',
                       value:response.data[i].APPLY_TYPE
                   },
                   {
                       label:'原时间：',
                       value:moment(response.data[i].ORI_DATE).format('YYYY-MM-DD HH:MM:SS'),
                   },
                   {
                       label:'新时间：',
                       value:moment(response.data[i].NEW_DATE).format('YYYY-MM-DD HH:MM:SS'),
                   },
                   {
                       label:'原因：',
                       value:response.data[i].REASON
                   },
                   ])
               break;
               case '取消':
                   this.info.push(
                   [           
                   {
                       label:'申请类型：',
                       value:response.data[i].APPLY_TYPE
                   },
                   {
                       label:'原因：',
                       value:response.data[i].REASON
                   },
                   ])
                break;
                case '更换教师':
                   this.info.push(
                   [           
                   {
                       label:'申请类型：',
                       value:response.data[i].APPLY_TYPE
                   },
                   {
                       label:'新教师：',
                       value:response.data[i].NEW_TEACHER
                   },
                   {
                       label:'原因：',
                       value:response.data[i].REASON
                   },
                   ])
                break;
                case '更换督导':
                   this.info.push(
                   [           
                   {
                       label:'申请类型：',
                       value:response.data[i].APPLY_TYPE
                   },
                   {
                       label:'新督导：',
                       value:response.data[i].NEW_SUPERVISOR
                   },
                   {
                       label:'原因：',
                       value:response.data[i].REASON
                   },
                   ])
                break;
                case '更换学生类型':
                   this.info.push(
                   [           
                   {
                       label:'申请类型：',
                       value:response.data[i].APPLY_TYPE
                   },
                   {
                       label:'新学生类型：',
                       value:response.data[i].NEW_TYPE
                   },
                   {
                       label:'原因：',
                       value:response.data[i].REASON
                   },
                   ])
                break;
                }
           this.list.push(temp)   
          }
         }
         else{
           console.log('获取改课记录失败')
         }
    })
    },
  }
}
</script>