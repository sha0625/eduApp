/**
 * Created by saturn on 2017/8/8.
 */

import * as api from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  searchData: 0,
};

const getters = {

};

const actions = {
  /**
   * 搜索
   * @param commit
   * @param data
   */
  getSearch({commit}, data){
    api.getSearch(data, payload => {
      commit(types.Comm_Search,payload);
    });
  }
};

const mutations = {
  /**
   * 设置搜索
   * @param state
   * @param payload
   */
    [types.Comm_Search](state, payload){
    state.searchData = payload;
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}
