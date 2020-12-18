<template>
  <view-box class="signUp gaofeng" bodyPaddingTop="0" bodyPaddingBottom="0">

    <!-- <x-header title="个人中心">
      <div slot="overwrite-left" class="left-arrow" @click="go('home')"></div>
      <x-icon slot="right" @click="go('signIn')" type="person-add" style="fill:#fff;"></x-icon>
    </x-header> -->

    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input required title="邀请码 :"
               v-model="invitationCode"></x-input>
      <x-input required title="昵称 :"
               v-model="name"></x-input>
      <divider>性别 ：</divider>
      <checker v-model="gender" default-item-class="checker-item" selected-item-class="checker-item-selected">
            <checker-item value="Male">男</checker-item>
            <checker-item value="Female">女</checker-item>
      </checker>                 
      <x-input required title="手机号 :"
               v-model="mobile"></x-input>
      <x-input required title="邮箱 :"
               v-model="email"></x-input>
      <x-input required title="QQ :"
               v-model="qq"></x-input>
               <!-- is-type="china-mobile" -->
      <x-input type="password" title="密码 :"
               v-model="passwd" required placeholder="请输入密码(6位以上)"></x-input>
      <x-input type="password" title="再次输入密码 :"
               v-model="passwdConfirm" required placeholder="请输入密码(6位以上)"></x-input>
      <span v-show="passwd != passwdConfirm" style="color:red;font-size:50%">两次输入的密码不相同</span>
<!--
      <x-input v-model="code" type="tel" title="验证码:"
               required placeholder="请输入验证码..."></x-input>
      <span class="ui-code" @click="getCode()">{{ codeVal }}</span>
      -->
    </group>

    <box gap="10px 10px">
      <x-button plain :disabled="passwd != passwdConfirm || !name || !mobile || !email || !passwd ||!passwdConfirm || !invitationCode " action-type="button" style="background: #fff;border-color:#ccc" @click.native="signUp" >注册</x-button>
    </box>

  </view-box>
</template>

<script>
  import {
    ViewBox, XHeader, Box, XInput, XButton, Grid, GridItem,
    Group, GroupTitle, Confirm, InlineXNumber, Tabbar, TabbarItem , Alert , Checker, CheckerItem , Divider
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
      Group, GroupTitle, Confirm, InlineXNumber, Tabbar, TabbarItem, Alert , Checker, CheckerItem , Divider
    },
    data(){
      return {
        name:'',
        email:'',
        gender:'',
        mobile: '',
        qq:'',
        passwd: '',
        passwdConfirm:'',
        invitationCode:'',
        code: '',
        codeVal: '获取验证码',
        codeFlog: false,
        wait: 60,
        parentPhone:[],//教务输入的所有家长手机
        parentCode:[],//教务输入的所有家长验证码
        id_card:'',
      }
    },
    computed: {
      ...mapGetters([
        'cart_goods_list'
      ])
    },
    methods: {
      signUp() {
          const that = this
          this.$http.post('http://139.199.168.158:8080/admin/signup_teacher', {
            username:this.name,
            password: this.passwd,
            phone : this.mobile,
            email : this.email,
            code : this.invitationCode,
            qq:this.qq,
            gender:this.gender
          }).then((response) => {
            console.log(response)
            response = response.data;
            if (response.code === 1) {
              console.log("注册成功")
              this.$vux.alert.show({
                title: '提示',
                content: '注册成功',
                onHide () {
                  that.$router.go(-2)
                }
              })
            } else {
              console.log("注册失败")
              this.$vux.alert.show({
                title: '提示',
                content: '注册失败 请联系教务人员',
              })
              // this.$popup({
              //   message: response.msg,
              //   color: '#ee2126',
              //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //   delay: 5
              // });
              // console.log("失败")
            }
          });
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
    .checker-item {
      border: 1px solid #ececec;
      padding: 5px 15px;
    }
    .checker-item-selected {
      border: 1px solid green;
    }
  }
</style>
