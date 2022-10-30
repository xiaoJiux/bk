import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import("../views/Article")
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import("../views/Message")
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import("../views/foot")
  },
  {
    path: '/about',
    name: 'About',
    component: () => import("../views/About")
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import("../views/Link")
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: ()=> import('../views/UserInfo')
  },
  {
    path: '/article/:id',
    name: 'xxArticle',
    component: () => import("../views/xxArticle")
  },
  {
    path:'/admin',
    name:'Admin',
    component: ()=>import("../views/Admin")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
