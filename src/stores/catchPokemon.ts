import { defineStore } from "pinia"

//.env variables to be used
const localStorageSeenPokemon: string = import.meta.env.VITE_LOCAL_STORE_POKEMON_SEEN
const pokemonEndpoint: string = import.meta.env.VITE_POKEMON_API + import.meta.env.VITE_ENDPOINT_POKEMON
const dexLenght: number = import.meta.env.VITE_DEX_LENGHT

export interface Pokemon {
    id: number,     //dex number
    name: string,   
    sprite: string, //sprite path
    types: string[],
    colorL: string,
    colorR: string
}

//the data I want to store from the pokemonEndpoint
// created by getting and downloading response from postman,
// then asking AI give a interface to get the data I was lookign for
interface PokeApiResponse {
    id: number,
    name: string,
    sprites: {
        front_default: string,
    }
    types: {
        type: {
            name: string
        }
    }[]
}

const pokeApiParams = {
    headers: {
        'content-Type': 'application/Json'
    }
}

const pokemonTypeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
}

//casts the poke api repsonse into cleaner class called Pokemon
function parsePokemon(data: PokeApiResponse): Pokemon {
    const types: string[] = data.types.map(t => {return t.type.name})
    let righColor: string
    let leftColor: string
    leftColor = pokemonTypeColors[types[0]]
    righColor = pokemonTypeColors[types[1] ? types[1] : types[0]]

    return {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: types,
        colorL: leftColor,
        colorR: righColor
    }
}

export async function fetchPokemon(dexNumber: number): Promise<Pokemon | Error> {
    const url: string = pokemonEndpoint + dexNumber
    console.log(url)
    const repsonse = await fetch(url, pokeApiParams)
    if (repsonse.ok) {
        try {
            const data: PokeApiResponse = await repsonse.json()
            const retPokemon: Pokemon = parsePokemon(data)
            return retPokemon
        } catch(err) {
            return new Error(err as undefined)
        }
    } else {
        return Error("fetch Pokemon failed: dex: " + dexNumber +
            "\n\tresponse status: " + repsonse.status + "\n\t\t" + repsonse.statusText)
    }
}

export const useCatchStore = defineStore("CatchStore", {
    state: () => {
        return {
            currentPokemon: null as Pokemon | null,
            nextPokemon: null as Pokemon | null,
            seenPokemon: [] as number[],
            error: null as Error | null,
            loading: false as boolean
        }
    },
    actions: {
        async init(){
            this.loading = true
            //look for local storage and if user has seen pokemon before
            const local = localStorage.getItem(localStorageSeenPokemon)
            if (local) {
                this.seenPokemon = JSON.parse(local) //stores it
            }
            const randomDex: number = this.randomDex
            const randomPokemon = await fetchPokemon(randomDex)
            //Error handeling since error contains a message
            if ("message" in randomPokemon) {
                this.error = randomPokemon
                this.loading = false
                return
            }
            this.currentPokemon = randomPokemon
            this.seenPokemon.push(randomDex)
            this.updateLocal()
            this.loading = false
            this.loadNext()
        },
        async loadNext() {
            const randomDex: number = this.randomDex
            const randomPokemon = await fetchPokemon(randomDex)
            //Error handeling since error contains a message
            if ("message" in randomPokemon) {
                this.error = randomPokemon
                return
            }
            this.nextPokemon = randomPokemon
        },
        moveToNextPokemon() {
            if (!this.nextPokemon) {
                return
            }
            this.currentPokemon = this.nextPokemon
            if (this.nextPokemon) {
                this.seenPokemon.push(this.nextPokemon.id)
                this.updateLocal()
            }
            this.nextPokemon = null
            this.loadNext()
        },
        //Update the local storage
        updateLocal() {
            localStorage.setItem(localStorageSeenPokemon, JSON.stringify(this.seenPokemon))
        }
    },
    getters: {
        randomDex: (state) => {
            if (state.seenPokemon.length >= dexLenght) {
                console.warn('User has seen all pokemon')
                resetSeenPokemon()
            }
            let randDex: number
            do {
                randDex = Math.floor(Math.random() * dexLenght) + 1
            } while (state.seenPokemon.includes(randDex))
            return randDex
        }
    }
})

function resetSeenPokemon() {
    console.log("Reseting seen pokemon")
    const store = useCatchStore()
    store.seenPokemon = []
    store.updateLocal()
}