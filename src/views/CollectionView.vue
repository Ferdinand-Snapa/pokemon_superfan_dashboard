<script setup lang="ts">
    import PokemonContainer from '@/components/pokemonContainer.vue';
    import { useFavoriteStore } from '@/stores/favoritePokemon';
    const favStore = useFavoriteStore()
</script>

<template>
    <div v-if="favStore.loading">Loading</div>
    <div v-else-if="favStore.error">{{ favStore.error }}</div>
    <div
        v-else
        v-for="pokemon in favStore.fevoritePokemon">
        <div v-if="pokemon">
            <PokemonContainer :pokemon="pokemon"/>
        </div>
    </div>
</template>