import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: ()=>import('../views/login.vue')
  },
  {
    path: '/todoList',
    name: 'todoList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/todoList.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/register.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
