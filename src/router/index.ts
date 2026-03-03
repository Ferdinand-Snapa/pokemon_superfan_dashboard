import { createRouter, createWebHistory } from 'vue-router'

import NewPokemonView from '@/views/NewPokemonView.vue'
import CollectionView from '@/views/CollectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'newPokemon',
      component: NewPokemonView,
    },
    {
      path: '/collection',
      name: 'collection',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CollectionView,
    },
  ],
})

export default router
