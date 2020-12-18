规划
<template>
    <div>
        <card v-for="(item,index) in list" :header="{title:item.title}" :key="index">
          <div slot="content" class="card-demo-flex card-demo-content01">
              <span>总课时数：{{item.total}}</span>
              <br/>
          </div> 
          <div v-for="n in rows[index]" slot="content" class="card-demo-flex card-demo-content01">   
            <div v-for="(item1,index1) in info[index]" v-if="index1>=n*3-3 && index1<n*3" class="vux-1px-r" :key="index1">
                  {{ item1.label }}
                  <br/>
                  <span>{{ item1.value }}</span>
                  <br/>
                  <span>教师:{{ item1.teacher }}</span>
                  <br/>
                  <span>助教:{{ item1.supervisor }}</span>
            </div>
          </div>
        </card>
    </div>
</template>
<script>
import { Card } from 'vux'
import moment from 'moment'

export default {
  components: {
    Card
  },
  data () {
    return {
      list:[],//学生所有信息
      info:[],//页面显示信息
      rows:[],//info各元素的长度
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList() {  
     this.$http.get('http://139.199.168.158:8080/admin/student_plan?id='+this.$store.getters.userid).then((response) => {
         response = response.data
          if (response.code === 1) {
            console.log('获取规划成功')
            let subject = ''
            let j = -1
            let total = 0
            for(var i = 0 ; i < response.data.length ; i++ ){
                if(subject != response.data[i].SUBJECT_A){
                    j++
                    subject = response.data[i].SUBJECT_A
                    this.list[j]={
                        title:response.data[i].SUBJECT_A,
                        total:0
                    }
                    this.info[j]=[]
                    this.rows[j]=0
                }  
                let temp = {
                  label:response.data[i].SUBJECT_B,
                  value:response.data[i].TOTAL,
                  teacher:response.data[i].TEACHER_NAME,
                  supervisor:response.data[i].SUPERVISOR_NAME,
                  time:moment(response.data[i].CREATED_TIME).format('YYYY-MM-DD') + '创建',
                }
                this.list[j].total = this.list[j].total + response.data[i].TOTAL,
                this.info[j].push(temp)
                this.rows[j]++
            }
            this.list = JSON.parse(JSON.stringify(this.list))
            this.info = JSON.parse(JSON.stringify(this.info))
            for(var i = 0 ; i < this.rows.length ; i++){
              this.rows[i] = parseInt(this.rows[i] / 3 )+ 1
            }//每三个二级课程为一行
          }
          else
          console.log('获取规划失败')
      })
    },
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
[v-cloak] {display: none;}
</style>