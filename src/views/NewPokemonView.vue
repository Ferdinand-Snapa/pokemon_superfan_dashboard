<script setup  lang="ts">
    import PokemonContainer from '@/components/pokemonContainer.vue';
import { useCatchStore } from '@/stores/catchPokemon';
    
    const catchStore = useCatchStore()
</script>

<template>
    <div v-if="catchStore.loading">
        NewPokemon loading
    </div>
    <div
        v-else-if="catchStore.error"> {{ catchStore.error }} 
    </div>
    <div v-else-if="catchStore.currentPokemon">
        <PokemonContainer :pokemon="catchStore.currentPokemon"/>
        <button
            rel="Catch pokemon Button"
            :title="`Catch ${ catchStore.currentPokemon.name }`"
            class="outline-5 outline-yellow-500 p-2 rounded-2xl text-2xl hover:text-primary">
                Catch {{ catchStore.currentPokemon.name }}</button>
        
    </div>
    <div v-else>
        yeh somthing up
    </div>
</template>