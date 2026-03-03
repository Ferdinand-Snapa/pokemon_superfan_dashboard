import { defineStore } from "pinia"
import type { Pokemon } from "./catchPokemon"
import { fetchPokemon } from "./catchPokemon"

const localStorageFavoritePokemon: string = import.meta.env.VITE_LOCAL_STORE_POKEMON_COLLECTION

export const useFavoriteStore = defineStore("FavoriteStore", {
    state: () => {
        return{
            favorite: [] as number[],
            pokemon: [] as Pokemon[],
            error: null as Error | null,
            loading: false as boolean
        }
    },
    actions: {
        async init(){
            const local = localStorage.getItem(localStorageFavoritePokemon)
            if (local) {
                this.favorite = JSON.parse(local)
                this.loading = true
                //Fetch all favorite pokemon
                const requests: Promise<Pokemon | Error>[] = this.favorite.map(dex => fetchPokemon(dex))
                const result: (Pokemon | Error)[] = await Promise.all(requests)
                result.forEach((item) => {
                    if ("message" in item) {
                        this.error = item
                        throw item
                    }
                    this.pokemon.push(item)
                })
                this.loading = false
            }
        },
        addFavorite(pokemon: Pokemon) {
            this.pokemon.push(pokemon)
            this.favorite.push(pokemon.id)
            this.updateLocal()
        },
        updateLocal(){
            localStorage.setItem(localStorageFavoritePokemon, JSON.stringify(this.favorite))
        },
        moveUp(dex: number) {

        },
        moveDown(dex: number) {

        }
    },
    getters:{
        fevoritePokemon: (state) =>
            state.favorite.map((dex) =>
                (state.pokemon.find((mon) => mon.id === dex)))
    }
})