<template>
<div id="fooder">
    <tabbar >
      <tabbar-item link="/teacher-centre" :selected="true">
        <img slot="icon" src="@/assets/image/ic_nav_news_normal.png">
        <span slot="label">今日工作</span>
      </tabbar-item>
      <tabbar-item link="/teacher-centre" :selected="true">
        <img slot="icon" src="@/assets/image/ic_nav_app_normal.png">
        <span slot="label">教学中心</span>
      </tabbar-item>
      <tabbar-item link="/teacher-centre" :selected="true">
        <img slot="icon" src="@/assets/image/ic_nav_my_normal.png">
        <span slot="label">账号中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar,TabbarItem } from 'vux'
  export default{
    name: 'AppFooter',
    components: {
      Tabbar,
      TabbarItem,
    },
    data(){
      return{
        index:0,
      }
    },
    methods:{
       onclick1(){
          console.log(1);
       }
    }

  }
</script>