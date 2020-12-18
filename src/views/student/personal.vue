<template>
    <group title="基本信息">    
      <cell title="姓名" :value="name"></cell>
      <cell title="院校" :value='campus'></cell>
      <cell title="生源地" :value='city'></cell>
      <cell title="身份证明" :value='id_card'></cell>
      <cell title="电话" :value='phone'></cell>
      <cell title="邮箱" :value='email'></cell>
    </group>
</template>

<script>
import { Cell, Group} from 'vux'
export default {
    components: {
      Cell, 
      Group,
    },
    data(){
        return{
            name:'',
            campus:'',
            city:'',
            id_card:'',
            phone:'',
            email:'',
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.$http.get('http://139.199.168.158:8080/admin/student_personal?id='+this.$store.getters.userid).then(res => {
            console.log(res)
            if (res.data.code === 1) {
                this.name = res.data.data[0][0].name
                this.campus = res.data.data[0][0].campus
                this.city = res.data.data[0][0].city
                this.id_card = res.data.data[0][0].id_card
                this.phone = res.data.data[1][0].phone
                this.email = res.data.data[1][0].email
              console.log('获取个人信息成功')
            }
            else {
              console.log('获取个人信息失败')
            }
            }); 
        },
    }
}
</script>