import { createRouter,createWebHistory } from "vue-router";
import {  showFailToast } from 'vant';
import 'vant/es/toast/style';
const routes =[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component: () => import('../views/Home/index.vue')
    },
    {
        path:'/login',
        name:'login',
        component: () => import('../views/Login/index.vue')
    },
    {
        path:'/user',
        name:'user',
        component: () => import('../views/User/index.vue')
    },
    {
        path:'/card',
        name:'card',
        component: () => import('../views/Card/index.vue')
    },
    {
        path:'/address',
        name:'address',
        component: () => import('../views/Address/Address.vue')
    },
    {
        path:'/address-edit',
        name:'address-edit',
        component: () => import('../views/Address/AddressEdit.vue')
    },
    {
        path:'/createorder',
        name:'createorder',
        component: () => import('../views/Order/CreateOrder.vue')
    },
    {
        path:'/order',
        name:'order',
        component:() => import('../views/Order/order.vue')
    },
    {
        path:'/product/:id',
        name:'product',
        component: () => import('../views/Product/index.vue')
    },{
        path:'/setting',
        name:'setting',
        component: () => import('../views/Setting/index.vue')
    },{
        path:'/about',
        name:'about',
        component: () => import('../views/About/index.vue') 
    }
]
const router  = createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('token')
    if(!token && (to.path== '/card' || to.path =='/user')){
        next('/login')
        showFailToast('未登录')
    }
    next()
})
export default router;