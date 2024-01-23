import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppTypes from "./views/AppTypes.vue";
import AppTypeDetails from "./views/AppTypeDetails.vue";
import AppCharacters from "./views/AppCharacters.vue";
import AppItem from "./views/AppItem.vue";
import SingleItem from "./views/SingleItem.vue";
import CharacterDetails from "./views/CharacterDetails.vue";

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
      path: '/types/:id',
      name: 'type-details',
      component: AppTypeDetails
    },

    {
      path: '/characters',
      name: 'characters',
      component: AppCharacters
    },
    {

      path: '/items',
      name: 'items',
      component: AppItem
    },

      path:'/items',
      name:'items',
      component:AppItem
    },
    {
      path: "/item/:id",
      name: "single-item",
      component: SingleItem,
    },
    {
      path:"/characters/:id",
      name:"characters-detail",
      component:CharacterDetails,
    },

  ]
})

export default router
