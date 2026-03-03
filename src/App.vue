<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="absolute top-0 pt-20">
      <nav class="flex flex-row gap-5 items-center">
        <RouterLink
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
