// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Home from './components/HelloFromVux'
import router from './router/';
import axios from 'axios';
import store from './store'
import VueI18n from 'vue-i18n'
import  { AlertPlugin } from 'vux'
import Upload from 'element-ui';
import vant from 'vant';
import 'vant/lib/index.css'; 

import VueTouch from 'vue-touch'
// import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css';
// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueI18n)

Vue.use(AlertPlugin)

Vue.use(Upload);

Vue.use(vant);

Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
