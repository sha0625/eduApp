<template>
    <div>
    <form-preview v-for="(item,index) in list" :header-label="item.label" :header-value="item.date" :footer-buttons="buttons" :body-items="info[index]" :key="index" :name="item.param"></form-preview>
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
      buttons: [{
        style: 'default',
        text: '详情',
        onButtonClick: (name) => {
          this.$router.push({
                // path: '/home'
                path: '/student-check',
                query:name
          });
        }
      }],//课程操作
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList() {
      this.$http.get('http://139.199.168.158:8080/admin/student_allevents?id='+this.$store.getters.userid).then((response) => {
         response = response.data
         if (response.code === 1) {
           console.log('获取排课记录成功')
           for(var i = 0 ; i < response.data.length ; i++){
           let temp={
             date:moment(response.data[i].COURSE_TIME).format('YYYY-MM-DD'),
             label:response.data[i].TEACHER_NAME,
             param:{
                       value1:response.data[i].id,
                       value2:response.data[i].TIMERANK_ID
                   }
           }
           this.info.push(
               [           
                   {
                       label:'时间：',
                       value:moment(response.data[i].COURSE_TIME).format('HH:mm:ss')
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
         else{
           console.log('排课记录失败')
         }
    })
    },
  }
}
</script>


<style lang="less">
//head 课程名字
.weui-form-preview__hd .weui-form-preview__label{
  color:rgb(0, 0, 0);//字体颜色
  font-size:20px;//字体大小
  font-family: Arial, Helvetica, sans-serif;//字体
  letter-spacing:1px;//字间距
  font-weight:500//字体加粗
}

//head 日期
.weui-form-preview__hd .weui-form-preview__value{
  color:rgb(0, 0, 0);//字体颜色
  font-size:10px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing:1px
}

//item 时间/课程/教室
.weui-form-preview__item .weui-form-preview__label{
  color:rgb(129, 129, 129);//字体颜色
  font-size:13px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing:3px
}

//item 时间内容/课程内容/教室内容
.weui-form-preview__item .weui-form-preview__value{
  color:rgb(129, 129, 129);//字体颜色
  font-size:13px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing:3px
}

//整体框边距与投影
.vux-form-preview.weui-form-preview{
  background:rgb(245, 245, 245);//背景颜色
  margin:0px 10px 15px 10px;//边框距离:顺序为上右下左
  box-shadow: 2px 2px 3px 2px rgba(170, 169, 169, 0.3)//框框投影:x轴（右正左负），y轴（上负下正），模糊半径，投影范围，投影颜色

}

//个人框head 框颜色
.vux-form-preview.weui-form-preview .weui-form-preview__hd{
  background:rgb(248, 247, 247);//背景颜色
}

//个人框body框 颜色
.vux-form-preview.weui-form-preview .weui-form-preview__bd{
  background:rgb(250, 249, 249);//背景颜色
}

//”返回“按键字体颜色
.vux-header .vux-header-left .vux-header-back{
  font-size:12px;
  color:rgb(255, 255, 255);//字体颜色
}

</style>