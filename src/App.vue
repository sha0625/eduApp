<template>
  <div id="app">
    <view-box ref="viewBox" body-padding-top="60px" body-padding-bottom="55px">
    <div>
      <!-- 顶部导航栏样式在下一行修改 -->
      <x-header
          style="width:100%;left:0;top:0;z-index:100;position:fixed;background:rgb(117, 172, 235)"
          :title="title"
          :transition="headerTransition"
          slot="header"
          :left-options="{showBack: $route.path !== '/' && $route.path.indexOf('home-') == -1}">
      </x-header>
    </div> 
    <!-- <transition :css="'forward'">
          <router-view class="router-view"></router-view>
    </transition> -->
    <div class="router-view">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <!-- 底部导航栏目样式在下一行修改 -->
    <tabbar v-show="isTeach" class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" style="position:fixed;boottom:0;background:rgb(117, 172, 235)">
      <tabbar-item link="/home-teacher-today" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-19.png">
        <span class='jrgz' slot="label">今日工作</span>
      </tabbar-item>
      <tabbar-item link="/home-teacher-centre" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-14.png">
        <span class='jxzx' slot="label">教学中心</span>
      </tabbar-item>
      <tabbar-item link="/home-teacher-account" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-16.png">
        <span class='zhzx' slot="label">账号中心</span>
      </tabbar-item>
      <tabbar-item link="/blank" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-8.png">
        <span class='xxzx' slot="label">消息中心</span>
      </tabbar-item>
    </tabbar>
    <tabbar v-show="isStudent" class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" style="position:fixed;boottom:0;background:rgb(117, 172, 235)">
      <tabbar-item link="/home-student-today" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-19.png">
        <span class='jrgz' slot="label">今日工作</span>
      </tabbar-item>
      <tabbar-item link="/home-student-centre" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-14.png">
        <span class='xxzx' slot="label">学习中心</span>
      </tabbar-item>
      <tabbar-item link="/home-student-account" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-16.png">
        <span class='zhzx' slot="label">账号中心</span>
      </tabbar-item>
      <tabbar-item link="/blank" >
        <img slot="icon" src="@/assets/image/34408976_0/矢量智能对象-8.png">
        <span class='xxzx' slot="label">消息中心</span>
      </tabbar-item>
    </tabbar>
    <tabbar v-show="isSupervisor" class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" style="position:fixed;boottom:0;">
      <tabbar-item link="/home-supervisor-today" >
        <img slot="icon" src="@/assets/image/ic_nav_news_normal.png">
        <span slot="label">今日工作</span>
      </tabbar-item>
      <tabbar-item link="/home-teacher-centre" >
        <img slot="icon" src="@/assets/image/ic_nav_app_normal.png">
        <span slot="label">课后监管</span>
      </tabbar-item>
      <tabbar-item link="/home-teacher-account" >
        <img slot="icon" src="@/assets/image/ic_nav_my_normal.png">
        <span slot="label">账号中心</span>
      </tabbar-item>
      <tabbar-item link="/blank" >
        <img slot="icon" src="@/assets/image/ic_nav_my_normal.png">
        <span slot="label">消息中心</span>
      </tabbar-item>
    </tabbar>
    </view-box>
  </div>
</template>





<script>
import {ViewBox, XHeader, Tabbar, TabbarItem, TransferDom } from 'vux'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      direction : 'forward',
      isRouterAlive: true
    }
  },
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
  },
  created(){
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  computed: {
    headerTransition () {
      return 'vux-header-fade-in-left'
    },
    title () {
      if (this.$route.path === '/') return '登录'
      // if (this.$route.path.split('/').length > 1) {
      //   console.log(this.$route)
      //   const parts = this.route.path.split('/')
      //   if (parts[2]) return parts[2]
      // }
      // switch(this.$store.getters.type){
      //   case 'teacher':
      //     console.log(this.$route)
      //     return '教师端'
      //     break;
      //   default:
      //     return '无'
      //     break;
      // }
      return this.$route.name
    },
    isTeach () {
      if (this.$store.getters.type == 'teacher') {
        return true
      }
      return false
    },
    isStudent () {
      if (this.$store.getters.type == 'student') {
        return true
      }
      return false
    },
    isSupervisor () {
      if (this.$store.getters.type == 'supervisor') {
        return true
      }
      return false
    },
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>







<style lang="less">
@import '~vux/src/styles/reset.less';

//界面背景色为纯色
body {
  background-color: #f3ededd3;
}

//界面背景色为渐变色
// body{
//     width: 100%;
// 		height: 100px;
// 		background: #0068B5;/* 为较旧的或者不支持的浏览器设置备用属性 */
// 		background: -moz-linear-gradient(left, #0068B5 0%, #7CAFE1 100%);/**/
// 		background: -webkit-gradient(linear, left, right, color-stop(0%, #0068B5), color-stop(100%, #7CAFE1));/**/
// 		background: -webkit-linear-gradient(left, #0068B5 0%, #7CAFE1 100%);/**/
// 		background: -o-linear-gradient(left, #0068B5 0%, #7CAFE1 100%);/**/
// 		background: -ms-linear-gradient(left, #0068B5 0%, #7CAFE1 100%);/**/
// 		background: linear-gradient(to right, #0068B5 0%, #7CAFE1 100%);/*用线性渐变创建图像*/
// 		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0068B5', endColorstr='#7CAFE1', GradientType=0);/* ie6 - ie8*/
// }


//界面背景为图片
// body{
//   background:url(图片路径) no-repeat 4px 5px
// }

//router-view作用是控制界面横向距离
.router-view {
  width: 100%;//改这里有效
  top: 200px;
  bottom: 200px
}

//设置底部导航栏
.vux-demo-tabbar{
  position:absolute;
  width: 10%;
  // top: 610px;//距离顶端的距离
  bottom: 50px;
}


//顶部title字体颜色
.vux-header-title{
  color:rgb(255, 255, 255);//字体颜色
}

//设置底部导航栏字属性
.jrgz{
  color:rgb(255, 255, 255);//字体颜色
  font-size:15px;//字体大小
  font-family: Arial, Helvetica, sans-serif//字体
}
.jxzx{
  color:rgb(255, 255, 255);//字体颜色
  font-size:15px;
  font-family: Arial, Helvetica, sans-serif
}
.zhzx{
  color:rgb(255, 255, 255);//字体颜色
  font-size:15px;
  font-family: Arial, Helvetica, sans-serif
}
.xxzx{
  color:rgb(255, 255, 255);//字体颜色
  font-size:15px;
  font-family: Arial, Helvetica, sans-serif
}

//设置全局字颜色
// span{
//   color:rgb(80, 80, 79);//字体颜色
//   letter-spacing:2px//字符间距
// }


// .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
//   color: #F70968;
// }
// .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
//   color: rgb(53, 73, 94);
// }
</style>
