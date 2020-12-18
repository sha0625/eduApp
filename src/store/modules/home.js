/**
 * Created by saturn on 2017/8/8.
 */

import * as axios from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  focus_list: [
    /*{
      title: '',
      url: 'javascript:;',
      img: 'https://static.vux.li/demo/1.jpg'
    }*/
  ],
  marquee_list: [
    '智能商城'
  ],
  goods_list: [
    /*{
      title: '',
      desc: '',
      src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      params: [],
      url: {
        path: '/car',
        replace: false
      }
    }*/
  ]
};

const getters = {
  focus_list: state => state.focus_list,
  marquee_list: state => state.marquee_list,
  goods_list: state => state.goods_list
};

const actions = {
  home_focus({commit}) {
    axios.getHomeFocus(payload => {
      commit(types.Home_Focus_List, payload);
    })
  },
  home_marquee({commit}){
    axios.getHomeMarquee().then(payload => {
      commit(types.Home_Marquee_List, payload);
    });
  },
  home_goods({commit}){
    axios.getHomeGoods(payload => {
      commit(types.Home_Goods_List, payload);
    });
  }
};

const mutations = {
  [types.Home_Focus_List](state, payload){
    state.focus_list = payload;
  },
  [types.Home_Marquee_List](state, payload){
    state.marquee_list = payload;
  },
  [types.Home_Goods_List](state, payload){
    state.goods_list = payload;
    state.goods_list['params'] = [{
      label: '',
      value: ''
    }];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}
