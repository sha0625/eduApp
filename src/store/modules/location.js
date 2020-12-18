/**
 * Created by saturn on 2017/8/8.
 */

import * as api from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  address: [{
    id: '',
    isUsed: false,
    name: '',
    phone: '',
    addrName: '北京/北京市/昌平区'
  }],
  setAddress: {
    name: '',
    phone: '',
    addressValue: ['浙江省', '杭州市', '西湖区'],
    addressInfo: ''
  },
  updateAddress: {
    id:'',
    contacts:'',
    phone:'',
    addrName:'',
    addrDetail:''
  },
  detailAddress: {
    id: 0,
    isUsed: false,
    name: '',
    phone: '',
    addrName: ['浙江省', '杭州市', '西湖区'],
  },
};

const getters = {
  common_address: state => state.address,
  common_detail_address: state => state.detailAddress,
};

const actions = {
  /**
   * 获取地址列表
   * @param commit
   */
  getAddress({commit}){
    api.getAddress(res => {
      commit(types.User_Get_Address, res);
    });
  },

  /**
   * 修改地址
   * @param commit
   * @param params
   */
  setAddress({commit}, params){
    return new Promise((resolve, reject) => {
      api.setAddress(params, result => {
        //console.log('setAddress', result);
      }).then(data=>{
        resolve(data);
      }).catch(err=>{
        result(err);
      });
    });
  },

  /**
   * 选择地址
   * @param commit
   * @param id
   */
  selectAddress({commit}, id){
    return new Promise((resolve, reject) => {
      api.selectAddress(id, result => {
        //console.log('selectAddress', result);
      }).then(res =>{
        resolve(res);
      }).catch(err =>{
        reject(err);
      })
    });
  },

  /**
   * 更新地址
   * @param commit
   * @param data
   */
  updateAddress({commit}, data){
    return new Promise((resolve, reject) => {
      api.updateAddress(data, result => {
        commit(types.User_Update_Address, result);
      }).then( data =>{
        resolve(data);
      }).catch( err =>{
        reject(err);
      });
    });
  },

  /**
   * 获取详细地址
   * @param commit
   * @param id
   */
  detailAddress({commit}, id){
    api.detailAddress(id, result => {
      commit(types.User_Detail_Address, result);
      //console.log('detailAddress', result);
    });
  },

  /**
   * 删除收货地址
   * @param commit
   * @param id
   */
  deleteAddress({commit}, id){
    return new Promise((resolve, reject) => {
      api.deleteAddress(id, result => {
        //console.log('deleteAddress', result);
      }).then(data=>{
        resolve(data);
      }).catch(err=>{
        reject(err);
      });
    });
  },
};

const mutations = {
  /**
   * 设置获取地址
   * @param state
   * @param payload
   */
    [types.User_Get_Address](state, payload){
    state.address = payload;
  },
  /**
   * 设置更新地址
   * @param state
   * @param payload
   */
    [types.User_Update_Address](state, payload){
    state.updateAddress = payload;
  },
  /**
   * 设置详细地址
   * @param state
   * @param payload
   */
    [types.User_Detail_Address](state, payload){
    state.detailAddress = payload;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
}
