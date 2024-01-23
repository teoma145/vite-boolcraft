import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppTypes from "./views/AppTypes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/types',
      name: 'types',
      component: AppTypes
    },
  ]
})

export default router
