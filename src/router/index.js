import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
