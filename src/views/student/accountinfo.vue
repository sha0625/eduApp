<template>
    <group title="账号信息">    
      <cell title="登录邮箱" :value="email"></cell>
      <cell title="登录手机" :value='phone'></cell>
      <cell title="账号昵称" :value='name'></cell>
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
            this.$http.get('http://139.199.168.158:8080/admin/student_account?id='+this.$store.getters.userid).then(res => {
            console.log(res)
            if (res.data.code === 1) {
                this.name = res.data.data[0].username
                this.phone = res.data.data[0].phone
                this.email = res.data.data[0].email
              console.log('获取账号信息成功')
            }
            else {
              console.log('获取账号信息失败')
            }
            }); 
        },
    }
}
</script>