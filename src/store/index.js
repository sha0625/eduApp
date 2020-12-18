/**
 * 组装模块并导出
 * Created by saturn on 2017/8/8.
 */

/*

 Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

 1.应用层级的状态应该集中到单个 store 对象中。

 2.提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

 3.异步逻辑都应该封装到 action 里面。

 只要你遵守以上规则，如何组织代码随你便。
 如果你的 store 文件太大，只需将 action、mutation、和 getters 分割到单独的文件。

 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './type';

// import Home from './modules/home';
// import Search from './modules/search';
// import Detail from './modules/detail';
// import Cart from './modules/cart';
// import OrderForm from './modules/orderForm';
// import Location from './modules/location';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    vue_token: null,
    userid:null,
    username:null,
    menusFlag: false,
    menus: {// detail\books\book\cart\PayList
      menu1: '首页',
      menu2: '购物车',
      menu3: '用户中心',
      menu4: '订单详情',
      menu5: '收货地址'
    },
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      window.localStorage.setItem('vue_token', data);
      state.vue_token = data;
    },
    [types.LOGOUT]: (state) => {
      window.localStorage.removeItem('vue_token');
      state.vue_token = null
    },
    [types.USERNAME]: (state, data) => {
      window.localStorage.setItem('username',data);
      state.username = data
    },
    [types.USERID]: (state, data) => {
      window.localStorage.setItem('userid',data);
      state.userid = data
    },
    MenusClose (state, menus) {
      //console.log('onMenusClose', state, menus);
      switch (menus) {
        case "menu1":
          state.menusFlag = false;
          app.$router.push({
            name: 'home'
          });
          break;
        case "menu2":
          state.menusFlag = false;
          app.$router.push({
            name: 'cart'
          });
          break;
        case "menu3":
          state.menusFlag = false;
          app.$router.push({
            name: 'user'
          });
          break;
        case "menu4":
          state.menusFlag = false;
          app.$router.push({
            name: 'books',
            query: {
              act: 'all'
            }
          });
          break;
        case "menu5":
          state.menusFlag = false;
          app.$router.push({
            name: 'location'
          });
          break;
      }
    },
  },
  actions: {
    
  },
  modules: {
    // Home,
    // Search,
    // Detail,
    // Cart,
    // Location,
    // OrderForm
  },
  getters: {
    getApp: (state) => state.count,
    get_home_tab_indexApp: state => {
      return state.home_tab_index
    },
    username: state => {
      return state.username
    },
    userid: state => {
      return state.userid
    },
    type: state => {
      return state.vue_token
    }
  }
});

export default store;
