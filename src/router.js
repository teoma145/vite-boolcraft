import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppCharacters from "./views/AppCharacters.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/characters',
      name: 'characters',
      component: AppCharacters
    },
  ]
})

export default router
