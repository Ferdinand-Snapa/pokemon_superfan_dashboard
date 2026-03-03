<script setup lang="ts">
import type { Pokemon  } from '@/stores/catchPokemon';
import  {  useCatchStore } from '@/stores/catchPokemon';
import { nextTick } from 'vue';
import { ref, watch } from 'vue';


const props = defineProps<{
  pokemon: Pokemon
}>()

const store = useCatchStore()

const imageLoad = ref(true)

watch(() => store.currentPokemon,
    async (newVal, oldVal) => {
        console.log("new pokemon")
        imageLoad.value = false
        setTimeout(() => {
            imageLoad.value = true
        }, 100)
    })


</script>

<template>
    <div class="flex items-stretch"
        :style="`background: linear-gradient(to right, ${pokemon.colorL}88, ${pokemon.colorR}88)`">
        <!--Dex number-->
        <h1
            rel="Pokemon Dex number"
            class="text-4xl self-center">
            # {{ pokemon.id }}</h1>
        <img
            rel="Pokemon Sprite"
            :title="`${pokemon.name} Sprite`"
            :src="pokemon.sprite"
            class="h-52 w-52  aspect-square shrink-0 transition-all "
            :class="imageLoad ? 'brightness-100 duration-700' : 'brightness-0 duration-0'"/>

        <div class="flex flex-col justify-center px-4 py-2 flex-1">
            <h2
                rel="Pokemon name"
                class="stroke-2 stroke-amber-400">{{ pokemon.name.toUpperCase() }}</h2>
            <div class="flex flex-row gap-5">
                <div v-for="type in pokemon.types">{{ type }}</div>
            </div>
        </div>
    </div>
</template>