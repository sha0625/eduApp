<template>
<div>
    <group title="作业信息">
      <cell title="作业编号" :value="homework.HOMEWORK_ID"></cell>
      <cell title="作业布置日期" :value="homework.ARRANGEMENT_DATE"></cell>
      <cell title="规定提交日期" :value="homework.SUBMISSION_DATE"></cell>
      <cell title="作业内容" :value="homework.CONTENT"></cell>
      <cell title="作业目标" :value="homework.OBJECTIVE"></cell>
      <cell title="计划用时" :value="homework.USE_TIME"></cell>
      <cell title="实际开始时间" :value="homework.REAL_START_TIME"></cell>
      <cell title="实际完成时间" :value="homework.REAL_FINISH_TIME"></cell>
      <cell title="实际耗时" :value="homework.REAL_CONSUME_TIME"></cell>
      <cell title="提交状态" :value="homework.SUBMISSION_STATE"></cell>
    </group>
    <group title="作业文件">
      <div v-show="homework.CORRECTION_FEEDBACK || type === 'teacher'">      
      <cell title="作业反馈" ></cell>  
        <x-textarea title="反馈" placeholder="请填写反馈" :show-counter="false" :rows="3" v-model="homework.CORRECTION_FEEDBACK" :readonly="type != 'teacher'"></x-textarea>
      </a> 
      </div> 
      <cell title="上传文件"></cell>  
          <!-- localhost:9528 -->
          <!-- <uploader
            :images="images"
            upload-url="http://139.199.168.158:8080/admin/uploadhomework"
            :params="params"
            size="small"
            @preview="previewMethod"
            @add-image="addImageMethod"
            @remove-image="removeImageMethod"
          ></uploader> -->
           <el-upload
             action="http://139.199.168.158:8080/admin/uploadhomework"
             list-type="picture-card"  
             ref="upload"
             :on-success="handleSuccess"
             :data="UploadData" 
             :before-upload="beforeUploadFile"
             accept="image/*">  
             <i class="el-icon-plus"></i>
           </el-upload>
      <cell title="已上传文件" v-show="homework.STATE>=2"></cell>  
      <a v-show="homework.STATE>=2" class="text-center p-2">
        <img class="previewer-demo-img" :src="HomeworkImg" width="300" @click="showH()">
            <div v-transfer-dom>
              <previewer :list="[{src:this.HomeworkImg,w: 800,h: 400}]" ref="previewerH"></previewer>
            </div>
             <!-- <x-img :src="HomeworkImg"></x-img> -->
      </a>   
      <cell title="反馈文件" v-show="homework.STATE==3"></cell>
      <a v-show="homework.STATE==3" class="text-center p-2">
             <!-- <img :src= 'CorrectImg'  width=600px height=400px > -->
             <!-- <x-img :src="CorrectImg"></x-img> -->
             <img class="previewer-demo-img" :src="CorrectImg" width="300" @click="showC()">
             <div v-transfer-dom>
               <previewer :list="[{src:this.CorrectImg,w: 800,h: 400}]" ref="previewerC"></previewer>
             </div>
      </a>
    </group>
    <group title="留言板">
       <div class="row min-h-180">
        <div class="col-sm-12">
          <ul class="list-group m-t-5">
            <li v-for="msg in msgs" class="list-group-item clearfix" track-by="id">
              <h4 class="list-group-item-heading">
                <a>
                  {{ msg.MSG }}
                </a>
                <small class="italic"> by
                  <a>
                    {{ msg.USER_NAME }}
                  </a>
                </small>
                <span class="badge pull-right">
                  {{ msg.TIME }}
                </span>
              </h4>
            </li>
          </ul>
          <h4 v-show="!total" class="text-muted text-center line-h-150 italic">
          （暂无留言信息）
          </h4>
        </div>
        </div>
        <div>
          <msg-form :msg.sync="msg" style="width:400px">
            <button slot="opt" @click="handleSubmit">
              提交
            </button>
          </msg-form>    
        </div>
    </group>
</div>
</template>
<script>
import { Previewer, Cell, Group, XImg, TransferDom, XTextarea } from 'vux'
import Uploader from 'vux-uploader'
import MsgForm from '../../components/MsgForm'
import moment from 'moment'
import axios from 'axios'

export default {
  directives: {
    TransferDom
  },
  components: {
    MsgForm,
    Previewer,
    Cell, 
    Group,
    XImg,
    Uploader,
    XTextarea
  },
  inject:['reload'],
  data(){
      return{
        type:'',//用户身份
        homework:'',//作业信息
        path:'',//作业路径
        HomeworkImg:'',//学生作业图片
        CorrectImg:'',//教师批改图片
        msgs:[],//所有留言信息
        msg:{
              content:''
        },//新留言
        total:0,
        params:{},
        images:[],
        UploadData:{
           name:'',
           studentname:'',
           studentid:'',
           },//上传作业文件名
        feedback:'',//作业反馈（仅限教师身份）   
      }
  },
  created(){
    this.type = this.$store.getters.type
    this.getlist()
  },
  methods:{
      getlist(){
            this.$http.get('http://139.199.168.158:8080/admin/calendarclickhomework?eventid='+this.$route.query.value).then((response) => {
            response = response.data
            if (response.code === 1) {
              console.log('获取作业信息成功')
              this.homework = response.data[0]
              this.homework.ARRANGEMENT_DATE=moment(this.homework.ARRANGEMENT_DATE).format('ll')
              this.homework.SUBMISSION_DATE=moment(this.homework.SUBMISSION_DATE).format('ll')
              // this.feedback = this.homework.CORRECTION_FEEDBACK
            }
            else{
              console.log('获取作业信息失败')
            }
            if(this.homework.STATE == 0 || this.homework.STATE == 1){
              this.HomeworkImg ='未提交作业'
            }
            else if(this.homework.STATE == 2){
            this.$http.get('http://139.199.168.158:8080/admin/homeworkfile?name='+'./upload/'+this.homework.STUDENT_ID+this.homework.STUDENT_NAME+'/'+this.homework.SUBJECT_NAME+'/'+this.homework.HOMEWORK_ID+'.jpeg',{responseType: 'arraybuffer'}).then((response) => {
              console.log('获取作业图片成功')
              var src = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
              this.HomeworkImg = src
            })
              // this.HomeworkImg = require('../../../public/upload/'+this.homework.STUDENT_ID+this.homework.STUDENT_NAME+'/'+this.homework.SUBJECT_NAME+'/'+this.$route.query.name+'.jpeg')
            } 
            else if(this.homework.STATE >= 3){
              //作业图片
            this.$http.get('http://139.199.168.158:8080/admin/homeworkfile?name='+'./upload/'+this.homework.STUDENT_ID+this.homework.STUDENT_NAME+'/'+this.homework.SUBJECT_NAME+'/'+this.homework.HOMEWORK_ID+'.jpeg',{responseType: 'arraybuffer'}).then((response) => {
              var src = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
              this.HomeworkImg = src
              //批改图片
              this.$http.get('http://139.199.168.158:8080/admin/homeworkfile?name='+'./upload/'+this.homework.STUDENT_ID+this.homework.STUDENT_NAME+'/'+this.homework.SUBJECT_NAME+'/'+this.homework.HOMEWORK_ID+'-批改.jpeg',{responseType: 'arraybuffer'}).then((response) => {
              var src = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
              this.CorrectImg = src
            })
            })
            }
            this.$http.get('http://139.199.168.158:8080/admin/getmessage?homeworkid='+this.homework.HOMEWORK_ID).then((response) => {
            console.log(response)
            response = response.data
            if (response.code === 1) {
              console.log('获取留言板成功')
              this.msgs = response.data
              for(var i = 0 ; i < this.msgs.length ; i++){
                  this.msgs[i].TIME = moment(this.msgs[i].TIME).format('YYYY-MM-DD HH:mm:ss')
              }
              if(response.data.length>0){
                  this.total = 1
              }
            }
            else{
              console.log('获取留言板失败')
            }
          }) 
          })       
      },
       handleSubmit(){
            this.$http.post('http://139.199.168.158:8080/admin/postmessage', {
            homeworkid:this.homework.HOMEWORK_ID,
            username:this.$store.getters.username,
            userid:this.$store.getters.id,
            type:this.$store.getters.type,
            msg:this.msg.content,
            time:moment().format('YYYY-MM-DD HH:mm:ss')
          }).then((response) => {
            console.log(response)
            response = response.data;
            if (response.code === 1) {
              console.log("留言成功")
              this.msg.content = ''
              this.getlist()
            } else {
              // this.$popup({
              //   message: response.msg,
              //   color: '#ee2126',
              //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //   delay: 5
              // });
              console.log("留言失败")
            }
          });
        },
        showH () {
          this.$refs.previewerH.show(0)
        },
        showC () {
          this.$refs.previewerC.show(0)
        },
      beforeUploadFile(file){
        let supervisor = ''
        if(this.$store.getters.type == 'supervisor')
           supervisor = this.$store.getters.username
        else
           supervisor = this.homework.SUPERVISOR_NAME
          //  139.199.168.158:8080
        if(this.$store.getters.type == 'supervisor' || this.$store.getters.type == 'student'){
          this.UploadData.name=this.homework.HOMEWORK_ID
          this.UploadData.studentname= this.homework.STUDENT_NAME
          this.UploadData.studentid=this.homework.STUDENT_ID
          this.UploadData.subjectname=this.homework.SUBJECT_NAME
          this.$http.post('http://139.199.168.158:8080/admin/homeworksubmit',{
             supervisorname:supervisor,
             submissiondate:moment().format('YYYY-MM-DD HH:mm:ss'),
             homeworkname:this.homework.HOMEWORK_ID
        }).then((response) => {
          response = response.data;
          if (response.code === 1) {
            console.log("作业提交成功")
          } else {
            // this.$popup({
            //   message: response.msg,
            //   color: '#ee2126',
            //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //   delay: 5
            // });
            console.log("作业提交失败")
          }
        });
        }
        else if (this.$store.getters.type == 'teacher'){
          this.UploadData.name=this.homework.HOMEWORK_ID+'-批改'
          this.UploadData.studentname= this.homework.STUDENT_NAME
          this.UploadData.studentid=this.homework.STUDENT_ID
          this.UploadData.subjectname=this.homework.SUBJECT_NAME
          this.$http.post('http://139.199.168.158:8080/admin/correctsubmit',{
             feedback:this.homework.CORRECTION_FEEDBACK,
             date:moment().format('YYYY-MM-DD HH:mm:ss'),
             homeworkname:this.homework.HOMEWORK_ID,
        }).then((response) => {
          response = response.data;
          if (response.code === 1) {
            console.log("作业提交成功")
          } else {
            // this.$popup({
            //   message: response.msg,
            //   color: '#ee2126',
            //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //   delay: 5
            // });
            console.log("作业提交失败")
          }
        });
        }
      },
      handleSuccess(res, file) {
        if(res.status == 200){
          this.reload()
        }
      },
  }
}
</script>