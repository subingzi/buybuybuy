/**
 * 使用Vue去运行App.vue
 */

import Vue from 'vue' //相当于 var Vue = require('vue')

//导入根组件
import App from './App.vue'
//导入moment
import moment from 'moment'
//导入router
import VueRouter from 'vue-router'
//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入vue-lazyload
import VueLazyLoad from 'vue-lazyload';
//导入vuex
import Vuex from 'vuex';

//使用懒加载
Vue.use(VueLazyLoad, {
    loading: require("./statics/site/images/01.gif")
})
//使用router
Vue.use(VueRouter)
Vue.use(ElementUI);

//使用vuex
Vue.use(Vuex)
//开启cookies
$axios.defaults.withCredentials = true
$axios.defaults.baseURL = 'http://39.108.135.214:8899/'

//导入组件
import goodslist from './components/goods/goodslist.vue'
import shopcart from './components/shopcart/shopcar.vue'
import goodsdetail from './components/goods/goodsdetail.vue'
import login from './components/account/login.vue'
import order from './components/order/order.vue'
import payfor from './components/pay/pay.vue'
import paySuccess from './components/pay/paySuccess.vue'

//创建路由对象 设置路由规则
var router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/goodslist'
        },
        {
            path: '/goodslist',
            component: goodslist
        },
        {
            path: '/getgoodsdetail/:goodsId',
            component: goodsdetail
        },
        {
            path: '/shopcart',
            component: shopcart
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/order/:ids',
            component: order,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/payfor/:payid',
            component: payfor,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/paySuccess',
            component: paySuccess,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    if (to.path != "/login") {
        console.log(222);
        localStorage.setItem('lastVisitPath', to.path)
    }


    //需要验证
    if (to.meta.requiresAuth) {
        //看是否登录
        $axios.get('site/account/islogin').then(response => {
            //没有登录
            if (response.data.code == 'nologin') {
                //去登陆页
                router.push({
                    path: '/login'
                })
            } else { //登录了
                next()
            }
        })
    } else {
        //不需要验证 往下走
        next()
    }

})

//局部导入
import {
    addLocalGoods,
    getLocalGoodsCount,
    updateLocalgoods,
    deleteLocalGoods
} from './comment/localstorage.js'
//创建一个仓库
const store = new Vuex.Store({
    state: {
        buyCount: 0,
    },
    getters: {
        getBuyCount: function (state) {
            if (state.buyCount > 0) {
                return state.buyCount
            } else {
                return getLocalGoodsCount()
            }
        }
    },
    mutations: {
        addGoods: function (state, payload) {
            state.buyCount = addLocalGoods(payload);
            // console.log(state.buyCount);
        },
        updataGoods: function (state, payload) {
            state.buyCount = updateLocalgoods(payload);
        },
        deleteGoods: function (state, payload) {
            state.buyCount = deleteLocalGoods(payload);
            // console.log(1);            
        }
    }
})


//Vue的过滤器
Vue.filter('gettime', (input, myformat = 'YYYY-MM-DD') => {
    //使用moment
    return moment(input).format(myformat);
})

//全局导入样式【每个组件都可以用】
import "./statics/site/css/style.css"

/**利用Vue框架创建出来的根实例，去把根组件的template中的内容，渲染到id=app的div中去 */
new Vue({
    router,
    el: "#app",
    /**
    render:function(createElement){//用来渲染根组件
       return createElement(App)
    }**/
    render: h => h(App),
    store,
})