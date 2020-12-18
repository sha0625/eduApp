<template>
<div>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/student-personal" :label="'个人信息'">
        <img slot="icon" src="@/assets/image/35026108/图层 15.png">
      </grid-item>
      <grid-item link="/student-accountinfo" :label="'账号信息'">
        <img slot="icon" src="@/assets/image/35025722/图层 22.png">
      </grid-item>
      <grid-item link="/safe" :label="'安全设置'">
        <img slot="icon" src="@/assets/image/35026108/云服务安全图标.png">
      </grid-item>
    </grid>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/teacher-calendar" :label="'登录方式'">
        <img slot="icon" src="@/assets/image/35025722/图层 3.png">
      </grid-item>
      <grid-item link="/teacher-course" :label="'监护人信息'">
        <img slot="icon" src="@/assets/image/35026102/图层 7.png">
      </grid-item>
      <grid-item link="/teacher-homework" :label="'公告'">
        <img slot="icon" src="@/assets/image/35026102/图层 14.png">
      </grid-item>
    </grid>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/teacher-calendar" :label="'合同管理'">
        <img slot="icon" src="@/assets/image/34407988/矢量智能对象-2.png">
      </grid-item>
      <grid-item link="/teacher-course" :label="'学员手册'">
        <img slot="icon" src="@/assets/image/35026102/图层 5.png">
      </grid-item>
      <grid-item link="/teacher-homework" :label="'纪律条款'">
        <img slot="icon" src="@/assets/image/34407988/矢量智能对象-3.png">
      </grid-item>
    </grid>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item link="/teacher-calendar" :label="'订单管理'">
        <img slot="icon" src="@/assets/image/35026102/图层 10.png">
      </grid-item>
      <grid-item link="/teacher-course" :label="'消耗明细'">
        <img slot="icon" src="@/assets/image/35026102/图层 18.png">
      </grid-item>
      <grid-item link="/teacher-homework" :label="'发票管理'">
        <img slot="icon" src="@/assets/image/35024310/矢量智能对象-15.png">
      </grid-item>
    </grid>
    <x-button type="warn" @click.native="logout">退出登录</x-button>
</div>
</template>
<script>
  import {XButton, Grid, GridItem, GroupTitle, Group, Toast} from 'vux'
  import axios from 'axios'
  import store from '@/store'
  import * as types  from '@/store/type';

  export default {
    components: {
      XButton,
      Group,
      Grid,
      GridItem,
      GroupTitle,
      Toast,
      store
    },
    data() {
      return {
        gardenId: '',
        garden_url: '',
        gardenId_wx: '',
        showPositionValue: false,
      }
    },
    created() {
    },
    methods: {
      href_to(_url) {
        if (_url == '') {
          this.showPositionValue = true;
        } else {
          this.$router.push({path: '/iframe', query: {url: _url}});
        }
      },
      logout(){
        this.$store.commit(types.LOGOUT)
        this.$router.replace({path:'/'})
      },
    }
  }
</script>
<style lang="less">
  body {
    background-color: #efeff4 !important;
  }

  #application {
    margin-top: 16px;
    position: absolute;
    width: 100%;
    .itemtitle {
      display: flex;
      align-items: center;
    }




    .itemtitle:before {
      content: '';
      display: inline-block;
      position: relative;
      top: 1px;
      width: 4px;
      height: 15px;
      margin: 0px 5px 0px 16px;
      background-color: #72bff3;
    }

    .weui-grid {
      height: 80px;
      text-align: center;
      font-size: 6.5px;
      color: #000000;
    }

    .weui-grid .weui-grid__label {
      font-size: 13px;
      margin: 4px 0px 12px;
      color: rgba(0, 0, 0, 0.9);
    }
    .weui-grid:before {
      border-right: 1px solid #ffffff;
    }
    .weui-grid:after {
      border-bottom: 1px solid #ffffff;
    }
    .weui-grids:before {
      border-top: 1px solid #ffffff;
    }
    .weui-grids {
      margin: 16px 0px;
      padding-bottom: 16px;
      border-bottom: 5px solid #f6f6f6;
      a {
        width: 25% !important;
      }
    }
    .weui-grid__icon {
      img {
        height: 20px;
        width: 20px;
        margin: auto;
      }
    }
  }


</style>