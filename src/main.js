import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// import Category from 'vue-category-tree/dist/vue-cateogry-tree.min'

createApp(App)
  .use(router)
  .use(store)
  // .use(Category)
  .mount('#app')
