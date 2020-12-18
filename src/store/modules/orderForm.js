/**
 * Created by saturn on 2017/8/8.
 */

import * as api from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  orderFormInfo: [],
  orderFormNumber: 0,
  orderFormList: [],
  paymentData: 0
};

const getters = {
  common_order_FormInfo: state => state.orderFormInfo,
  common_order_FormNumber: state => state.orderFormNumber,
  common_order_FormList: state => state.orderFormList,
  common_order_FormData: state => state.paymentData

};

const actions = {
  /**
   * 保存订单&&返回结果
   * @param commit
   * @param data
   */
  orderFormSave({commit}, data){
    return new Promise((resolve, reject) => {
      api.orderFormSave(data, payload => {
        commit(types.Order_Form_Number, payload.orderNum);
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  },

  /**
   * 获取订单列表
   * @param commit
   * @param data
   */
  orderFormList({commit}, data){
    api.orderFormList(data, payload => {
      commit(types.Books_Get_List, payload);
    });
  },

  /**
   * 获取订单详情
   * @param commit
   * @param data
   */
  orderFormInfo({commit}, data){
    api.orderFormInfo(data, payload => {
      commit(types.Book_Get_Info, payload);
    });
  },

  /**
   * 删除订单
   * @param commit
   * @param data
   */
  orderFormDelete({commit}, data){
    return new Promise((resolve, reject) => {
      api.orderFormDelete(data, payload => {
        //console.log('orderFormDelete', payload);
      }).then(data=>{
        resolve(data);
      }).catch(err=>{
        reject(err);
      });
    });
  },

  /**
   * 再次购买
   * @param commit
   * @param data
   */
  orderFormReBuy({commit}, data){
    return new Promise((resolve, reject) => {
      api.orderFormReBuy(data, payload => {
        commit(types.Comm_Goods_ReBuy, payload);
      }).then(data=>{
        resolve(data);
      }).catch(err=>{
        reject(err);
      });
    });
  },

  /**
   * 确认收货
   */
  orderFormConfirm({commit}, data){
    api.orderFormConfirm(data, payload => {
      commit(types.Order_Form_Confirm, payload);
    });
  },

  /**
   * 支付
   */
  onPayment({commit}, data){
    return new Promise((resolve, reject) => {
      api.onPayment(data, payload => {
        commit(types.Comm_Payment, payload);//?支付回调数据
        resolve(payload);
      });
    });
  },
};

const mutations = {
  /**
   * 保存订单&&回调数据
   * @param state
   * @param payload
   */
    [types.Order_Form_Number](state, payload){
    state.orderFormNumber = payload;
  },

  /**
   * 获取订单列表
   */
    [types.Books_Get_List](state, payload){
    state.orderFormList = payload;
  },

  /**
   * 获取订单详情
   * @param state
   * @param payload
   */
    [types.Book_Get_Info](state, payload){
    state.orderFormInfo = payload;
  },

  /**
   * 再次购买 ||　占位
   * @param state
   * @param payload
   */
    [types.Comm_Goods_ReBuy](state, payload){
  },

  /**
   * 确认收货 ||　占位
   * @param state
   * @param payload
   */
    [types.Order_Form_Confirm](state, payload){
  },

  /**
   * 支付
   * @param state
   * @param payload
   */
    [types.Comm_Payment](state, payload){
    state.paymentData = payload;
  },

};


export default {
  state,
  actions,
  mutations,
  getters
}
