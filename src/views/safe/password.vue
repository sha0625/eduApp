<template>
    <group>    
      <x-input title="旧密码" v-model="pswd_old" show-clear></x-input>
      <x-input title="新密码" v-model="pswd_new" show-clear></x-input>
      <x-input title="确认密码" v-model="pswd_confirm" show-clear></x-input>
      <span v-show="pswd_new != pswd_confirm" style="color:red;font-size:50%">两次输入的密码不相同</span>
      <x-button type="primary" :disabled="pswd_new != pswd_confirm ||!pswd_old || !pswd_new || !pswd_confirm" @click.native="confirm">确认修改</x-button>
    </group>
</template>

<script>
import { Cell, Group, XButton, XInput} from 'vux'
export default {
    components: {
      Cell, 
      Group,
      XButton,
      XInput
    },
    data(){
        return{
            pswd_old:'',
            pswd_new:'',
            pswd_confirm:'',
        }
    },
    methods:{
        confirm(){
        this.$http.post('http://139.199.168.158:8080/admin/safe_password', {
            pswd_old:this.pswd_old,
            pswd_new:this.pswd_new,
            type:this.$store.getters.type,
            id:this.$store.getters.userid
          }).then((response) => {
            response = response.data;
            if (response.code === 1) {
              console.log("修改密码成功")
            } else {
              // this.$popup({
              //   message: response.msg,
              //   color: '#ee2126',
              //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //   delay: 5
              // });
              console.log("修改密码失败")
            }
          });          
        },
    }
}
</script>