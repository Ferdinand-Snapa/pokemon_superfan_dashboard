<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCatchStore } from './stores/catchPokemon';
import { useFavoriteStore } from './stores/favoritePokemon';
import { onMounted } from 'vue';

const cachStore = useCatchStore()
const favoriteStore = useFavoriteStore()

onMounted(() => {
  cachStore.init()
  favoriteStore.init()
})

function handleCatchNewPokemon() {
  cachStore.moveToNextPokemon()
}
</script>

<template>
  <header>
    <div class="absolute inset-0 h-52 pt-20 w-screen">
      <nav class="flex flex-row gap-5 self-center">
        <RouterLink
          @click="handleCatchNewPokemon"
          to="/"
          class="outline-5 outline-lime-500 rounded-2xl text-2xl">
          Catch New Pokemon</RouterLink>

        <RouterLink
          to="/collection"
          class="outline-5 outline-yellow-500 rounded-2xl text-2xl">
          Pokemon Collection</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
nav a.router-link-exact-active {
  color: var(--color-red-400);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
