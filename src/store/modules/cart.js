/**
 * Created by saturn on 2017/8/8.
 */

import * as api from '../axios/';
import * as types from '../type/';

// 数据源
const state = {
  goods_list: [
    /*{
    "id": 0,
    "title": "",
    "type": "",
    "price": 0,
    "num": 0,
    "desc": "",
    "src": "http://placeholder.qiniudn.com/60x60/3cc51f/ffffff",
    "url": {
      "path": "/car",
      "replace": false
    }
  }*/
  ],
  goods_money: 0,
  goods_count: 0,

};

const getters = {
  common_goods_list: state => state.goods_list,
  common_goods_money: state => state.goods_money,
  common_goods_count: state => state.goods_count,

};

const actions = {

  /**
   * 获取购物清单
   * @param commit
   */
  cartGoodsList({commit}){
    api.cartGoodsList(payload => {
      let money = 0;
      payload.forEach(item => {
        if (item.price >= 0 && item.num >= 1) {
          money += item.price * item.num;
        }
      });
      commit(types.Comm_Goods_Money, money);
      commit(types.Comm_Goods_List, payload);
    });
  },

  /**
   * 购物车总额
   * @param commit
   */
  cartGoodsMoney({commit}){
    api.cartGoodsList(payload => {
      let money = 0;
      payload.forEach(item => {
        if (item.price >= 0 && item.num >= 1) {
          money += item.price * item.num;
        }
      });
      commit(types.Comm_Goods_Money, money);
    });
  },

  /**
   * 详情页 增加商品
   * @param commit
   * @param dispatch
   * @param id
   */
  goodsAddCart({commit, dispatch}, id){
    api.goodsAdd(id, payload => {
      commit(types.Comm_Goods_Add, payload);

      /*高级用法：新增完成再请求总数*/
      dispatch('goodsGetNumber', id);
    })
  },

  /**
   * 购物车 增加商品
   * @param commit
   * @param dispatch
   * @param id
   */
  goodsAdd({commit, dispatch}, id){
    api.goodsAdd(id, payload => {
      commit(types.Comm_Goods_Add, payload);

      dispatch('cartGoodsMoney');  // 计算总额
    })
  },

  /**
   * 减少商品
   * @param commit
   * @param dispatch
   * @param item
   */
  goodsRemove({commit, dispatch}, item){
    api.goodsRemove(item, payload => {
      commit(types.Comm_Goods_Remove, payload);

      dispatch('cartGoodsMoney');  // 计算总额

    });
  },

  /**
   * 购物车总数
   * @param commit
   * @param id
   */
  goodsGetNumber({commit}, id){
    api.goodsGetNumber(id, payload => {
      commit(types.Comm_Goods_Count, payload);
    });
  },
};

const mutations = {
  /**
   * 设置商品列表
   * @param state
   * @param payload
   */
    [types.Comm_Goods_List](state, payload){
    state.goods_list = payload;
  },

  /**
   * 设置购物车总金额
   * @param state
   * @param payload
   */
    [types.Comm_Goods_Money](state, payload){
    state.goods_money = payload;
  },

  /**
   * 设置新增商品
   * @param state
   * @param payload
   */
    [types.Comm_Goods_Add](state, payload){},

  /**
   * 设置减少商品
   * @param state
   * @param payload
   */
    [types.Comm_Goods_Remove](state, payload){},

  /**
   * 设置商品总数
   * @param state
   * @param payload
   */
    [types.Comm_Goods_Count](state, payload){
    state.goods_count = payload;
  },
};


export default {
  state,
  actions,
  mutations,
  getters
}
