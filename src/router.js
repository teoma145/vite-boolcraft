import { createRouter, createWebHistory } from 'vue-router'
import AppHome from "./views/AppHome.vue";
import AppTypes from "./views/AppTypes.vue";
import AppTypeDetails from "./views/AppTypeDetails.vue";
import AppCharacters from "./views/AppCharacters.vue";
import AppItem from "./views/AppItem.vue";
import SingleItem from "./views/SingleItem.vue";
import CharacterDetails from "./views/CharacterDetails.vue";
import GameComponent from "./views/GameComponent.vue";
import AppOurTeam from "./views/AppOurTeam.vue";

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
      path: "/characters/:id",
      name: "characters-detail",
      component: CharacterDetails,
    },
    {
      path: '/items',
      name: 'items',
      component: AppItem
    },
    {
      path: "/items/:id",
      name: "single-item",
      component: SingleItem,
    },
    {
      path: "/our-team",
      name: "our-team",
      component: AppOurTeam,
    },
    {
      path: "/game",
      name: "game",
      component: GameComponent,
    },


  ]
})

export default router
