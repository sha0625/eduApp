/**
 * Created by saturn on 2017/8/8.
 */

import * as api from './api';
import axios from 'axios';
import Vue from 'vue';
import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp);

/**
 * 001 首页焦点图
 * @param callback
 * @returns null
 */
function getHomeFocus(callback) {
  axios.get(api.home_get_carouse).then(res => {
    if (res.data.code === 200) {
      let data = res.data.data.map(item => {
        return {
          title: item.name,
          url: 'detail?id=' + item.url,
          img: item.pathInfo.indexOf("http") === -1 ? (api.imgSrc + item.pathInfo) : item.pathInfo
        }
      });
      callback(data);
    }
  });
}

/**
 * 002 首页无缝滚动
 * @returns Promise
 */
function getHomeMarquee() {
  return new Promise((resolve, reject) => {
    Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then(data => {
      let marquee_list = data.live.filter(item => {
        return item.addata === null && item.picInfo[0];
      }).map(item => {
        return {title: item.title}
      });
      resolve(marquee_list);
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 003 首页商品列表
 * @param callback
 * @returns null
 */
function getHomeGoods(callback) {
  axios.get(api.home_get_goods).then(res => {
    if (res.data.code === 200) {
      let data = res.data.data.map(item => {
        return {
          id: item.id,
          title: item.goodsName,
          price: item.salePrice,
          pic: item.productImg.indexOf("http") === -1 ? (api.imgSrc + item.productImg) : item.productImg
        }
      });
      callback(data);
    }
  });
}

/**
 * 004 获取 商品详情
 * @param id
 * @param callback
 */
function getDetailGoods(id, callback) {
  axios({
    url: api.get_detail,
    // url: '/static/get_goods_detail.json',
    method: 'post',
    params: {},
    data: {goodsId: id}
  }).then(res => {
    if (res.data.code === 200) {
      let item = res.data.data;
      let data = {
        title: item.goodsName,
        desc: item.goodsDesc != 'undefined' ? item.goodsDesc : '暂无简介',
        info: item.goodsInfo,
        price: item.salePrice,
        pics: item.imgList.map(el => ({
          url: el.url.indexOf('http') === -1 ? (api.imgSrc + el.url) : el.url
        }))
      };
      callback(data);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 005 获取购物车数量
 * @param id
 * @param callback
 */
function goodsGetNumber(id, callback) {
  axios({
    url: api.goods_get_number,
    method: 'post',
    params: {},
    data: {goodsId: id}
  }).then(res => {
    if (res.data.code === 200) {
      callback(res.data.data);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 006 购物车清单
 */
function cartGoodsList(callback) {
  axios({
    url: api.cart_goods_list,
    method: 'post',
    params: {},
    data: {}
  }).then(res => {
    if (res.data.code === 200) {
      let data = res.data.data;
      let arr = data.filter(item => {
        return item.goods != 'undefined';
      }).map(item => ({
        "id": item.goodsId,
        "title": item.goods.goodsName,
        "type": "暂无分类",
        "price": item.goods.salePrice, // 折后金额
        "num": item.num,
        "checked": item.checked,
        "desc": "暂无简介",
        //"pic": item.goods.productImg,
        "pic": item.goods.productImg.indexOf("http") === -1 ? (api.imgSrc + item.goods.productImg) : item.goods.productImg,
        "url": {
          "path": "/car",
          "replace": false
        }
      }));
      callback(arr);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 007 增加商品
 * @param id
 * @param callback
 */
function goodsAdd(id, callback) {
  axios({
    url: api.goods_add,
    method: 'post',
    params: {},
    data: {goodsId: id}
  }).then(res => {
    if (res.data.code === 200) {
      callback(res.data);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 008 减少商品
 * @param item
 * @param callback
 */
function goodsRemove(item, callback) {
  axios({
    url: api.goods_remove,
    method: 'post',
    params: {},
    data: {
      goodsId: item.id,
      num: item.num + 1
    }
  }).then(res => {
    if (res.data.code === 200) {
      callback(res.data);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 009 获取 收货地址
 * @param callback
 */
function getAddress(callback) {
  axios({
    url: api.address_list,
    method: 'post',
  }).then(res => {
    let arr = res.data.data.filter(item => {
      return item.contacts != 'undefined' && item.phone.length === 11;
    }).map(item => ({
      id: item.id,
      isUsed: item.isUsed == 2,
      name: item.contacts,
      phone: item.phone,
      addrName: item.addrName.split(' ').join('/')
    }));
    callback(arr);
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 010 新增 收货地址
 * @param address
 * @param callback
 */
function setAddress(address, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.address_save,
      method: 'post',
      data: address,
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      callback(res.data);
      resolve(res.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * 011 选择默认 收货地址
 * @param id
 * @param callback
 */
function selectAddress(id, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.address_update,
      method: 'get',
      params: {id: id},
      data: {},
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      callback(result.data);
      resolve(result.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * 012 修改 详细收货地址
 * @param data
 * @param callback
 */
function updateAddress(data, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.address_save,
      method: 'post',
      params: {id: data.id},
      data: data
    }).then(result => {
      callback(result.data);
      resolve(result.data);
    }).catch( err =>{
      reject(err);
    });
  });
}

/**
 * 013 获取 详细收货地址
 * @param id
 * @param callback
 */
function detailAddress(id, callback) {
  axios({
    url: api.address_getDetail,
    method: 'get',
    params: {id: id},
    data: {}
  }).then(result => {
    let data = result.data.data;
    callback({
      id: data.id,
      isUsed: 2,
      name: data.contacts,
      phone: data.phone,
      addrDetail: data.addrDetail,
      addrName: data.addrName.split('/')

    });
  });
}

/**
 * 014 删除 收货地址
 * @param id
 * @param callback
 */
function deleteAddress(id, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.address_remove,
      method: 'get',
      params: {id: id},
      data: {}
    }).then(result => {
      callback(result.data);
      resolve(result.data);
    }).catch(err=>{
      reject(err);
    });
  });
}

/**
 * 015 保存订单
 * @param data
 * @param callback
 */
function orderFormSave(data, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.orderForm_save,
      method: 'post',
      params: {},
      data: data || {}
    }).then(result => {
      resolve(result.data.data);
      callback(result.data.data);
    }).catch(err=>{
      reject(err);
    });
  });
}

/**
 * 016 支付
 * @param data
 * @param callback
 */
function onPayment(data, callback) {
  axios({
    url: api.payment_api,
    method: 'post',
    params: {},
    data: data || {}
  }).then(result => {
    callback(result.data);
  });

}

/**
 * 017 获取订单列表
 * @param data
 * @param callback
 */
function orderFormList(data, callback) {
  axios({
    url: api.order_list,
    method: 'post',
    params: {},
    data: data
  }).then(result => {
    let arrList = [];
    let data = result.data.data;
    if (result.data.code === 200) {
      data.forEach((item, index) => {
        // 默认数据
        let goodsList = [{
          label: '订单号',
          value: item.orderNum
        }];
        item.goodsList.forEach((item) => {// 追加数据
          goodsList.push({
            label: item.goodsName,
            value: 'x' + item.num
          });
        });

        // 追加图片
        let productImg = item.goodsList.filter(item=>{
          return item.productImg;
        }).map(item => {
          return{
            productImg: item.productImg.indexOf("http") === -1 ? (api.imgSrc + item.productImg) : item.productImg
          }
        });

        // 默认菜单
        let buttonsMeun = [{
          style: 'default',
          text: '查看订单',
          link: '/bookInfo?act=books&id=' + item.id
        }, {
          style: 'primary',
          text: '删除订单',
          link: '/books'
        }];

        // 拼接数据
        arrList.push({
          id: item.id,
          orderNum: item.orderNum,
          totalPrice: item.totalPrice,
          productImg: productImg,
          goodsList: goodsList,
          btnMeun: buttonsMeun
        })
      });

      callback(arrList);
    }
  });
}

/**
 * 018 获取订单详情
 * @param data
 * @param callback
 */
function orderFormInfo(data, callback) {
  axios({
    url: api.order_info,
    method: 'post',
    params: {},
    data: data || {}
  }).then(result => {
    if (result.data.code === 200) {
      if (typeof result.data.data.goodsList !== 'undefined') {
        let data = result.data.data;
        let res = data.goodsList.map(item => ({
          "payStatus": data.payStatus === 2 ? '已支付' : '待支付',
          "orderNum": data.orderNum,
          "createDate": data.createDate,
          "express": data.express,
          "logisticsNum": data.logisticsNum,
          "address": data.address,
          "addrId": data.addrId,
          "totalPrice": data.totalPrice,
          "id": data.id,
          "goodsName": item.goodsName,
          "number": item.num,
          "goodsDesc": item.goodsDesc,
          "goodsInfo": item.goodsInfo,
          "pic": item.productImg.indexOf("http") === -1 ? (api.imgSrc + item.productImg) : item.productImg
        }));
        console.log(13,data.express);
        console.log(13,data.logisticsNum);
        callback(res);
      }
    }
  })
}

/**
 * 019 删除订单
 * @param data
 * @param callback
 */
function orderFormDelete(data, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.order_delete,
      method: 'post',
      params: {},
      data: data || {}
    }).then(result => {
      callback(result.data);
      resolve(result.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * 020 再次购买
 * @param data
 * @param callback
 */
function orderFormReBuy(data, callback) {
  return new Promise((resolve, reject) => {
    axios({
      url: api.order_buyAgain,
      method: 'post',
      params: {},
      data: data || {}
    }).then(result => {
      if (result.data.code === 200) {
        callback(result.data);//用订单ID生成购物车数量
        resolve(result.data);
      }
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * 021 确认收货
 * @param data
 * @param callback
 */
function orderFormConfirm(data, callback) {
  axios({
    url: api.order_confirm,
    method: 'post',
    params: {},
    data: data || {}
  }).then(result => {
    callback(result.data);
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 022 搜索
 * @param data
 * @param callback
 */
function getSearch(data, callback) {
  axios({
    url: api.get_search,
    method: 'post',
    params: {},
    data: data || {}
  }).then(result => {
    if (result.data.code === 200) {
      let data = result.data.data.map(item => ({
        id: item.id,
        title: item.goodsName,
        pic: item.productImg.indexOf("http") === -1 ? (api.imgSrc + item.productImg) : item.productImg,
        price: item.salePrice,
        params: []
      }));
      callback(data);
    }
  }).catch(err => {
    console.log(err);
  });
}

/**
 * 样板函数
 * @param uid
 * @returns {Promise}
 */
function axiosDemo(uid) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'http://3g.163.com/touch/jsonp/sy/recommend/0-9.html',
      method: 'get',
      params: {uid: uid},    // GET
      data: {},      // POST
    }).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}

export {
  getHomeFocus,
  getHomeMarquee,
  getHomeGoods,
  getDetailGoods,
  goodsGetNumber,
  cartGoodsList,
  goodsAdd,
  getAddress,
  setAddress,
  goodsRemove,
  selectAddress,
  updateAddress,
  detailAddress,
  deleteAddress,
  orderFormSave,
  orderFormList,
  orderFormInfo,
  orderFormDelete,
  orderFormReBuy,
  onPayment,
  orderFormConfirm,
  getSearch
}
