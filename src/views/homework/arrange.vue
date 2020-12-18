<template>
<div>
      <cell title="作业ID">{{HomeworkID}}</cell>
      <datetime
        required
        v-model="homework.SUBMISSION_DATE"
        title="提交日期">
      </datetime>
      <cell title="规定用时">
          <inline-x-number required v-model="homework.USE_TIME" style="display:block;" :min="0" width="50px" button-style="round"></inline-x-number>
      </cell>
      <cell title="作业内容"></cell>
      <x-textarea required :max="100" placeholder="请输入" v-model="homework.CONTENT"></x-textarea>
      <cell title="作业目标"></cell>
      <x-textarea required :max="100" placeholder="请输入" v-model="homework.OBJECTIVE"></x-textarea>
      <x-button type="primary" @click.native="update">完成</x-button>
</div>
</template>
<script>
import {Cell, Group, TransferDom, XTextarea, XButton, Datetime, InlineXNumber } from 'vux'
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
    Datetime,
    InlineXNumber
  },
  data(){
      return{
          HomeworkID:'',
          homework:{
              SUBMISSION_DATE:'',
              USE_TIME:0,
              CONTENT:'',
              OBJECTIVE:'',
          },//作业内容
          course:'',//课程详情
      }
  },
  created(){
      this.course = this.$route.query.course
      this.HomeworkID = this.$route.query.HomeworkID
  },
  methods:{
      update(){
          this.$http.post('http://139.199.168.158:8080/admin/homeworkconfirm', {
            eventid:this.course.id,
            teachername:this.course.TEACHER_NAME,
            teacherid:this.course.TEACHER_ID,
            studentname:this.course.STUDENT_NAME,
            studentid:this.course.STUDENT_ID,
            subjectname:this.course.SUBJECT_NAME,
            supervisorname:this.course.SUPERVISOR_NAME,
            supervisorid:this.course.SUPERVISOR_ID,
            homeworkid:this.HomeworkID,
            content:this.homework.CONTENT,
            submissiondate:moment(this.homework.SUBMISSION_DATE).format('YYYY-MM-DD HH:mm:ss'),
            objective:this.homework.OBJECTIVE,
            usetime:this.homework.USE_TIME,
            type:this.course.TYPE,
          }).then((response) => {
            response = response.data;
            if (response.code === 1) {
              console.log("作业布置成功")
              this.$router.go(-1);
            } else {
              // this.$popup({
              //   message: response.msg,
              //   color: '#ee2126',
              //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //   delay: 5
              // });
              console.log("作业布置失败")
            }
          });
      },
  }
}
</script>