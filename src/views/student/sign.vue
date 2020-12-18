<template>
    <div>
    <form-preview v-for="(item,index) in list" :header-label="item.date" :header-value="item.signtime" :body-items="info[index]" :key="index"></form-preview>
    <br>
  </div>
</template>


<script>
import { FormPreview } from 'vux'
import moment from 'moment'
export default {
  name:'StudentSign',
  components: {
    FormPreview
  },
  data(){
    return{
      list:[],//所有课程列表
      info:[],
    }
  },
  created(){
    this.getlist()
  },
  methods:{
    getlist(){
      this.$http.get('http://139.199.168.158:8080/admin/student_sign?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         if (response.code === 1) {
          console.log('获取签课记录成功')
          for(var i = 0 ; i < response.data.length ; i++){
           let temp={
             date:moment(response.data[i].COURSE_TIME).format('YYYY-MM-DD'),
             signtime:moment(response.data[i].STUDENT_SIGNTIME).format('HH:MM:SS')
           }
           this.info.push(
               [           
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
        else
        console.log('获取签课记录失败')
        })
    },
  }
}
</script>