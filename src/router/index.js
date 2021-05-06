import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true // 此组件需要被缓存
    }
  },
  {
    path: '/carts',
    name: 'Cart',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Carts.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
