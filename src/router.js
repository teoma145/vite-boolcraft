import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppItem from "./views/AppItem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path:'/items',
      name:'items',
      component:AppItem
    }
    
  ]
})

export default router
