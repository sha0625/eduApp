<template>
<div>
    <group title="授课反馈">    
      <cell title="授课内容"></cell>
      <x-textarea :max="100" placeholder="请输入" :disabled='!edit' v-model="course.COURSE_CONTENT"></x-textarea>
      <cell title="课堂表现"></cell>
      <x-textarea :max="100" placeholder="请输入" :disabled='!edit'  v-model="course.COURSE_PERFORMANCE"></x-textarea>
      <cell title="上次作业问题"></cell>
      <x-textarea :max="100" placeholder="请输入" :disabled='!edit'  v-model="course.HMPROBLEM"></x-textarea>
      <cell title="提升建议"></cell>
      <x-textarea :max="100" placeholder="请输入" :disabled='!edit'  v-model="course.PROPOSAL"></x-textarea>
      <x-button type="primary" v-if="!edit" @click.native="edit = true">编辑</x-button>
      <x-button type="primary" v-if="edit" @click.native="update">完成</x-button>
    </group>
    <group title="作业布置">    
      <form-preview v-for="(item,index) in homework" :header-label="item.HOMEWORK_ID"   :body-items="homework_info[index]" :key="index"></form-preview>
      <x-button type="primary" @click.native="arrange">布置作业</x-button>
    </group>
</div>
</template>
<script>
import { Cell, Group, TransferDom, XTextarea, XButton, FormPreview, XInput } from 'vux'
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
    FormPreview,
    XInput
  },
  data(){
      return{
          course:{
            COURSE_CONTENT:'',
            COURSE_PERFORMANCE:'',
            HMPROBLEM:'',
            PROPOSAL:'',
          },//课程信息
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
              this.content = response.data.data[0].COURSE_CONTENT
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
      update(){
        this.$http.post('http://139.199.168.158:8080/admin/coursefeedbackpost', {
          eventid:this.$route.query.value1,
            CourseContent:this.course.COURSE_CONTENT,
            CoursePerformance:this.course.COURSE_PERFORMANCE,
            HMProblem:this.course.HMPROBLEM,
            Proposal:this.course.PROPOSAL,
          }).then((response) => {
            response = response.data;
            if (response.code === 1) {
              console.log("提交授课反馈成功")
              this.edit = false
            } else {
              // this.$popup({
              //   message: response.msg,
              //   color: '#ee2126',
              //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //   delay: 5
              // });
              console.log("提交授课反馈失败")
            }
          });
      },
      arrange(){
        this.$router.push({
                path: '/homework-arrange',
                query:{
                  HomeworkID:this.HomeworkID,
                  course:this.course
                }
          });
      },
  }
}
</script>