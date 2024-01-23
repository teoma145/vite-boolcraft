import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppTypes from "./views/AppTypes.vue";
import AppCharacters from "./views/AppCharacters.vue";
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
      path: '/types',
      name: 'types',
      component: AppTypes
    },
    {
      path: '/characters',
      name: 'characters',
      component: AppCharacters
    },
    {
      path:'/items',
      name:'items',
      component:AppItem
    }
  ]
})

export default router
