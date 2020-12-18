<template>
  <div>
    <form-preview v-for="(item,index) in list" :header-label="item.STUDENT_NAME" :header-value="item.SUBJECT_B" :body-items="info[index]" :key="index"></form-preview>
    <br>
  </div>
</template>
<script>
import { FormPreview } from 'vux'

export default {
  components: {
    FormPreview
  },
  data () {
    return {
      list: '',//学生所有信息
      info:[],//页面显示信息
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList() {  
    console.log('用户信息：')
    console.log(this.$store)
    // console.log(this.$store.getters.token)
    // this.listLoading = true
    // this.$http.get('http://139.199.168.158:8080/admin/teacherscourse?teacherid='+this.$store.userid).then((response) => {
    // response = response.body
    // if (response.code === 1) {
    //   console.log('教师课程获取')
    //   console.log(response)
    //   let course1 = ''
    //   let course2 = ''
    //   let course3 = ''
    //   if(response.data[0].COURSE1){
    //     course1 = response.data[0].COURSE1+'_t'
    //   }
    //   if(response.data[0].COURSE2){
    //     course2 = response.data[0].COURSE2+'_t'
    //   }
    //   if(response.data[0].COURSE3){
    //     course3 = response.data[0].COURSE3+'_t'
    //   }
    //  }
    //  })
     this.$http.get('http://139.199.168.158:8080/admin/mystudent?teacher='+this.$store.getters.userid).then((response) => {
         console.log('获取学员姓名及课时情况')
         console.log(response)
         response = response.data
          if (response.code === 1) {
            console.log('获取我的学生成功')
            this.list = response.data
            for(var i = 0 ; i < response.data.length ; i++ ){
              let temp = [
                {
                label:'课时总数',
                value:response.data[i].TOTAL
                },
                {
                label:'课时消耗',
                value:response.data[i].CONSUMED
                },
                {
                label:'已安排课时',
                value:response.data[i].ARRANGED
                },
              ]
              this.info.push(temp)
            }
          }
      })
      console.log(this.info)
      this.listLoading = false
    },
  }
}
</script>