<script setup  lang="ts">
    import PokemonContainer from '@/components/pokemonContainer.vue';
    import { useCatchStore } from '@/stores/catchPokemon';
    import { useFavoriteStore } from '@/stores/favoritePokemon';

    const catchStore = useCatchStore()
    const favoriteStore = useFavoriteStore()

    function handleOnCatch() {
        if (catchStore.currentPokemon) {
            favoriteStore.addFavorite(catchStore.currentPokemon)
            catchStore.moveToNextPokemon()
        }
        
    }
</script>

<template>
    <div v-if="catchStore.loading">
        NewPokemon loading
    </div>
    <div
        v-else-if="catchStore.error"> {{ catchStore.error }} 
    </div>
    <div v-else-if="catchStore.currentPokemon"
        class="w-max">
        <PokemonContainer :pokemon="catchStore.currentPokemon"/>
        <button
            @click="handleOnCatch"
            rel="Catch pokemon Button"
            :title="`Catch ${ catchStore.currentPokemon.name }`"
            class="outline-5 outline-yellow-500 p-2 rounded-2xl text-2xl hover:text-primary">
                Catch {{ catchStore.currentPokemon.name }}</button>
        
    </div>
    <div v-else>
        yeh somthing up
    </div>
</template>