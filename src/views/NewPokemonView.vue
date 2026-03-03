<script setup  lang="ts">
    import { useCatchStore } from '@/stores/catchPokemon';
    import { onMounted } from 'vue';

    const catchStore = useCatchStore()
    onMounted(() => {
        catchStore.init()
        console.log("just mounted new pokemon page")
    })
</script>

<template>
    <div v-if="catchStore.loading">
        NewPokemon loading
    </div>
    <div
        v-else-if="catchStore.error"> {{ catchStore.error }} 
    </div>
    <div v-else-if="catchStore.currentPokemon">
        {{ catchStore.currentPokemon.name }}
    </div>
    <div v-else>
        yeh somthing up
    </div>
</template>