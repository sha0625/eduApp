<template>
<div>
<div>
    <group title="签课">    
      <x-button type="primary" size="mini" @click.native="studentDialog = true" :disabled="Boolean(list.STUDENT_SIGNTIME)">
            <div v-if="list.STUDENT_SIGNTIME!=null">
              已签
            </div>
            <div v-else>
              学生
            </div>
      </x-button>
      <x-button type="primary" size="mini" @click.native="teacherDialog = true" :disabled="Boolean(list.TEACHER_SIGNTIME)">
            <div v-if="list.TEACHER_SIGNTIME!=null">
              已签
            </div>
            <div v-else>
              教师
            </div>
      </x-button>
      <x-button type="primary" size="mini" @click.native="handelSupervisor" :disabled="Boolean(list.SUPERVISOR_SIGNTIME)">
            <div v-if="list.SUPERVISOR_SIGNTIME!=null">
              已签
            </div>
            <div v-else>
              督导
            </div>
      </x-button>
    </group>
</div>
<x-dialog title="学生签课确认" hide-on-blur :show.sync="studentDialog">
      <div>
        <datetime title="学生签课时间" format="HH:mm" v-model="studentTime"></datetime>
      </div>
      <div>
        <x-button type="primary" size="mini" @click.native="handelStudent">确认</x-button>
      </div>
</x-dialog>
<x-dialog title="教师签课确认" hide-on-blur :show.sync="teacherDialog">
      <div>
        <datetime title="教师签课时间" format="HH:mm" v-model="teacherTime"></datetime>
      </div>
      <div>
        <x-button type="primary" size="mini" @click.native="handelTeacher">确认</x-button>
      </div>
</x-dialog>
</div>
</template>
<script>
import { Group, TransferDom, XButton, FormPreview, Datetime, XDialog} from 'vux'
import moment from 'moment'
export default {
  directives: {
    TransferDom,
  },
  components: {
    XButton,
    Group,
    FormPreview,
    Datetime,
    XDialog
  },
  data(){
      return{
          list:'',//课程信息
          studentTime:moment().format('YYYY-MM-DD HH:mm:ss'),
          teacherTime:moment().format('YYYY-MM-DD HH:mm:ss'),
          studentDialog:false,
          teacherDialog:false,
      }
  },
  created(){
        this.getlist()
  },
  methods:{
     getlist(){
        this.$http.get('http://139.199.168.158:8080/admin/coursecheck?eventid='+this.$route.query.id).then((response) => {     
          response = response.data;
          if (response.code === 1) {
            this.list = response.data[0]
            console.log("获取课程信息成功")
          } else {
            // this.$popup({
            //   message: response.msg,
            //   color: '#ee2126',
            //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //   delay: 5
            // });
            console.log("获取课程信息失败")
          }
        });
        // this.date=this.event.coursetime.startOf('day')
      },
    handelStudent(){
      this.$http.post('http://139.199.168.158:8080/admin/studentsign', {
              id : this.list.id,
              time : moment(this.studentTime).format('YYYY-MM-DD HH:mm:ss')
        }).then((response) => {
          response = response.data;
          if (response.code === 1) {
            console.log("学生签到成功")
            this.studentDialog = false
            this.getlist()
          } else {
            // this.$popup({
            //   message: response.msg,
            //   color: '#ee2126',
            //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //   delay: 5
            // });
            console.log("学生签到失败")
          }
        });
    },
    handelTeacher(){
      this.$http.post('http://139.199.168.158:8080/admin/teachersign', {
            id : this.list.id,
            time : moment(this.teacherTime).format('YYYY-MM-DD HH:mm:ss')
       }).then((response) => {
         response = response.data;
         if (response.code === 1) {
           console.log("教师签到成功")
           this.teacherDialog = false
           this.getlist()
         } else {
           // this.$popup({
           //   message: response.msg,
           //   color: '#ee2126',
           //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
           //   delay: 5
           // });
           console.log("教师签到失败")
         }
       });
    },
    handelSupervisor(){
      this.$http.post('http://139.199.168.158:8080/admin/supervisorsign', {
            id : this.list.id,
            time : moment().format('YYYY-MM-DD HH:mm:ss')
       }).then((response) => {
         response = response.data;
         if (response.code === 1) {
           console.log("督导签到成功")
           this.getlist()
         } else {
           // this.$popup({
           //   message: response.msg,
           //   color: '#ee2126',
           //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
           //   delay: 5
           // });
           console.log("督导签到失败")
         }
       });
    },


  }
}
</script>