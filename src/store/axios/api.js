/**
 * Created by saturn on 2017/11/4.
 */

/***********************API服务器地址********************************/
// export const baseUrl = 'http://192.168.50.155:8881/api';
export const baseUrl = 'http://192.168.50.230:8883/api';

// 图片服务器地址
// export const imgSrc = 'http://192.168.50.216/';

/***********************登录相关********************************/
export const getCode_api = baseUrl + '/v1/sys/'; // 验证码
export const signUp_api = baseUrl + '/v1/user/login'; // 登录
export const signIn_api = baseUrl + '/v1/mall/user/register'; // 注册

/***********************获取产品列表********************************/
export const home_get_goods = baseUrl + '/a/shop/goods/list'; //
export const home_get_carouse = baseUrl + '/a/shop/carousel/getCarouselList'; // 焦点图
export const get_detail = baseUrl + '/a/shop/goods/getInfo'; // 商品详情
export const get_search = baseUrl + '/a/shop/goods/searchList'; // 搜索

/***********************购物车********************************/
export const goods_get_number = baseUrl + '/a/shop/cart/getCartNum'; // 获取购物车总数量
export const cart_goods_list = baseUrl + '/a/shop/cart/getList'; // 获取购物车列表
export const goods_remove = baseUrl + '/a/shop/cart/remove'; // 删除购物车产品
export const goods_add = baseUrl + '/a/shop/cart/add'; // 加入购物车
export const detail_changeChecked = baseUrl + '/a/shop/cart/changeChecked'; // 多选

/***********************收货地址********************************/
export const address_list = baseUrl + '/a/shop/receive/address/list'; // 收货地址列表
export const address_save = baseUrl + '/a/shop/receive/address/save'; // 保存收货地址
export const address_update = baseUrl + '/a/shop/receive/address/update'; // 选择收货地址
export const address_remove = baseUrl + '/a/shop/receive/address/remove'; // 删除收货地址
export const address_getDetail = baseUrl + '/a/shop/receive/address/getDetail'; // 修改收货地址详细

/***********************订单********************************/
export const orderForm_save = baseUrl + '/a/shop/order/saveOrder'; // 订单保存
export const order_list = baseUrl + '/a/shop/order/getOrderList'; // 获取订单列表
export const order_info = baseUrl + '/a/shop/order/getOrderDetail'; // 获取订单信息
export const order_delete = baseUrl + '/a/shop/order/delete'; // 删除订单
export const order_confirm = baseUrl + '/a/shop/order/receipt'; // 确认收货
export const order_buyAgain = baseUrl + '/a/shop/order/buyAgain'; // 再次购买

/***********************在线支付接口********************************/
export const payment_api = baseUrl + '/1/WAP/pay';
