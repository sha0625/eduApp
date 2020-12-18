<template>
    <div>
    <form-preview v-for="(item,index) in list" :header-label="item.type" :header-value="item.name" :body-items="info[index]" :key="index"></form-preview>
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
      this.$http.get('http://139.199.168.158:8080/admin/student_today?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         console.log(response)
         if (response.code === 1) {
           console.log('获取排课记录成功')
           for(var i = 0 ; i < response.data[0].length ; i++){
               if(moment(response.data[0][i].COURSE_TIME).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                  let temp={
                    type:'课程',
                    name:response.data[0][i].SUBJECT_NAME
                  }
                  this.info.push(
                  [           
                      {
                          label:'时间：',
                          value:moment(response.data[0][i].COURSE_TIME).format('HH:mm:ss')
                      },
                      {
                          label:'教室：',
                          value:response.data[0][i].ROOM_ID
                      },
                  ])
                this.list.push(temp)  
               }           
          }
          for(var i = 0 ; i < response.data[1].length ; i++){
               if(moment(response.data[1][i].SUBMISSION_DATE).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
                  let temp={
                    type:'作业',
                    name:response.data[1][i].SUBJECT_NAME
                  }
                  this.info.push(
                  [           
                      {
                          label:'ID：',
                          value:response.data[1][i].HOMEWORK_ID
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
    // this.$http.get('http://139.199.168.158:8080/admin/student_homework?id='+this.$store.getters.userid).then((response) => {
    //      response = response.data
    //      console.log(response)
    //      if (response.code === 1) {
    //        console.log('获取作业成功')
    //       //  this.eventlist=response.data
    //        console.log(response)
    //        for(var i = 0 ; i < response.data[1].length ; i++){
    //            if(moment(response.data[1][i].SUBMISSION_DATE).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')){
    //               let temp={
    //                 type:'作业',
    //                 name:response.data[1][i].SUBJECT_NAME
    //               }
    //               this.info.push(
    //               [           
    //                   {
    //                       label:'ID：',
    //                       value:response.data[1][i].HOMEWORK_ID
    //                   },
    //               ])
    //             this.list.push(temp)  
    //            }           
    //       }
    //      }
    //      else{
    //        console.log('获取作业失败')
    //      }
    // })
    },
  }
}
</script>