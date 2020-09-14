import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '商品详情',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '提交订单',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },
  {
    path: '/cashier',
    name: 'cashier',
    meta: {
      title: '收银台',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Cashier.vue'),
    beforeEnter: (to, from, next) => {
      from.path == '/myorder' ? router.replace({ name: "home" }) : next();
    }
  },
  {
    path: '/myorder',
    name: 'myorder',
    meta: {
      title: '我的订单',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Myorder.vue'),
  },
  {
    path: '/returngoods',
    name: 'returngoods',
    meta: {
      title: '填写退货',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/ReturnGoods.vue')
  },
  {
    path: '/order_details',
    name: 'order_details',
    meta: {
      title: '订单详情',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Order_details.vue')
  },
  {
    path: '/search_details',
    name: 'search_details',
    meta: {
      title: '订单详情',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Search_details.vue')
  },
  {
    path: '/return',
    name: 'return',
    meta: {
      title: '同步通知页面',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Return.vue')
  },
  {
    path: '/notify',
    name: 'notify',
    meta: {
      title: '异步通知页面',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Notify.vue')
  }
]
// VueRouter.prototype.goBack=function(){
//   this.isBack=true;
//   window.history.go(-1);
// }
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next();
// })
export default router
