/**
 * Created by saturn on 2017/8/8.
 */

import * as axios from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  swiper_data: {
    /*title: '',
    desc: '',
    info: '',
    price: 0,
    params: [{
      label: '',
      value: ''
    }],
    pics: [{
      url: 'https://static.vux.li/demo/1.jpg'
    }]*/
  }
};

const getters = {
  detail_swiper: state => state.swiper_data
};

const actions = {
  getDetailGoods({commit}, id) {
    axios.getDetailGoods(id, payload => {
      commit(types.Get_Detail_Goods, payload);
    })
  }
};

const mutations = {
  [types.Get_Detail_Goods](state, payload){
    state.swiper_data = payload;
    state.swiper_data['params'] = [{
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
