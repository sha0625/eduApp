<template>
  <view-box class="signUp gaofeng" bodyPaddingTop="0" bodyPaddingBottom="0">

    <!-- <x-header title="个人中心">
      <div slot="overwrite-left" class="left-arrow" @click="go('home')"></div>
      <x-icon slot="right" @click="go('signIn')" type="person-add" style="fill:#fff;"></x-icon>
    </x-header> -->

    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input type="tel" required title="账<i class='vux-blank-half'></i><i class='vux-blank-half'></i>号 :"
               v-model="mobile" placeholder="请输入手机号\邮箱\用户名..."></x-input>
               <!-- is-type="china-mobile" -->
      <x-input type="password" title="密<i class='vux-blank-half'></i><i class='vux-blank-half'></i>码 :"
               v-model="passwd" required placeholder="请输入密码(6位以上)"></x-input>
<!--
      <x-input v-model="code" type="tel" title="验证码:"
               required placeholder="请输入验证码..."></x-input>
      <span class="ui-code" @click="getCode()">{{ codeVal }}</span>
      -->
    </group>
    
    <box gap="10px 10px">
      <x-button plain action-type="button" style="background: #fff;border-color:#ccc" @click.native="signUp">注册</x-button>
    </box>
    <box gap="10px 10px">
      <x-button plain action-type="button" style="background: #fff;border-color:#ccc" @click.native="login">登录</x-button>
    </box>
     

  </view-box>
</template>

<script>
  import {
    ViewBox, XHeader, Box, XInput, XButton, Grid, GridItem,
    Group, GroupTitle, Confirm, InlineXNumber, Tabbar, TabbarItem
  } from 'vux';
  import {
    mapState, mapMutations, mapGetters, mapActions
  } from "vuex";
  // import * as api from '../store/axios/api';
  import * as types  from '@/store/type';

  export default {
    name: 'Login',
    components: {
      ViewBox, XHeader, Box, XInput, XButton, Grid, GridItem,
      Group, GroupTitle, Confirm, InlineXNumber, Tabbar, TabbarItem
    },
    data(){
      return {
        mobile: '',
        passwd: '',
        code: '',
        codeVal: '获取验证码',
        codeFlog: false,
        wait: 60,
      }
    },
    computed: {
      ...mapGetters([
        'cart_goods_list'
      ])
    },
    created(){},
    mounted(){},
    methods: {
      login(){
      //   this.$http.get('http://139.199.168.158:8080/admin/Login',{params:{username: this.mobile,password: this.passwd}}).then((response) => {
      //   console.log(response)
      //    if (response.body.code === 1) {
      //      console.log('登陆成功')
      //      console.log(response)
      //      this.$refs.loginForm.validate(valid => {
      //         if (valid) {
      //           this.loading = true
      //           let newform = {
      //             username:form.username,
      //             password: form.password,
      //             type:response.body.data[0].type,
      //             id:response.body.data[0].userid,
      //           }
      //           this.$store.dispatch('user/login', newform)
      //             .then(() => {
      //               this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      //               this.loading = false
      //             })
      //             .catch(() => {
      //               this.loading = false
      //             })
      //         } else {
      //           console.log('error submit!!')
      //           return false
      //         }
      //       })
      //    }
      //  }) 

        // if (this.mobile!=="" && this.mobile.length ===11) {
          // if (this.mobile!=="") {
          // this.$http({
          //   url:'http://139.199.168.158:8080/admin/Login',
          //   method:'post',
          //   data:{
          //     /*verifyCode: this.code,*/
          //     userName: this.mobile,
          //     passwd: this.passwd
          //   },
          //   params:{
          //     userName: this.mobile,
          //     passwd: this.passwd
          //     }
          // })
          // 139.199.168.158
          if (this.mobile!=="") {
          this.$http.get('http://139.199.168.158:8080/admin/Login',{params:{username: this.mobile,password: this.passwd}}).then(res => {
            console.log(res)
            if (res.data.code === 1) {
              let data = res.data.data[0];
              this.$store.commit(types.LOGIN, data.type);
              this.$store.commit(types.USERNAME, data.realname);
              this.$store.commit(types.USERID, data.userid);
              // let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              let redirect = ''
              console.log(data)
              switch(data.type){
                case 'teacher':
                  redirect = '/home-teacher-centre';
                  break;
                case 'student':
                  redirect = '/home-student-centre';
                  break;
                case 'parent':
                  redirect = '/home-student-centre';
                  break;
                case 'supervisor':
                  redirect = '/home-supervisor-home';
                  break;
              }
              this.$router.push({
                // path: '/home'
                path: redirect
              });
            }
            else {
              this.$vux.alert.show({
                title: '登录失败',
                content: '用户名或密码错误',
              })
            }
          }).catch(err=>{
            console.log(err);
          });
        }else{
          this.$vux.toast.show({
            type:'cancel',
            text:'手机号有误'
          });
        }
      },
      signUp(){
        this.$router.push({
                // path: '/home'
                path: '/sign-up'
              });
      },
      getCode(){
        if (this.codeFlog)return;
        if(this.mobile !=="" && this.mobile.length===11){
          this.$http({
            url:api.getCode_api + this.mobile + '/2/sms',
            method:'post',
            data:{},
            params:{}
          }).then(res => {
            if (res.data.code === 200) {
              this.time();
            }
            if(res.data.code === 500){
              this.$vux.toast.show({
                type:'cancel',
                text:res.data.message
              });
            }
          });
        }else{
          this.$vux.toast.show({
            type:'cancel',
            text:'手机号有误'
          });
        }
      },
      time() {
        if (this.wait === 0) {
          this.codeFlog = false;
          this.codeVal = "获取验证码";
          this.wait = 60;
        } else {
          this.codeFlog = true;
          this.codeVal = "重新发送(" + this.wait + ")";
          this.wait--;
          setTimeout( () =>{
            this.time()
          }, 1000);
        }
      },
    }
  }
</script>

<style lang="less">
  .signUp {
    .weui-input,
    .weui-label {
      font-size: 14px;
    }
    .ui-code{
      line-height: 25px;
      font-size: 12px;
      border:1px solid #ccc;
      padding: 0 5px;
      border-radius: 4px;
      position: absolute;
      right: 45px;
      bottom: 8px;
      z-index: 10;
    }
  }
</style>
