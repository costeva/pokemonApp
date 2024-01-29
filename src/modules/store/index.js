import { defineStore } from 'pinia'
import axios from 'axios'
export const usePokemonStore = defineStore('pokemon',{

  state: () => ({
    loading: false,
    item: [],
    names: [],
    error: null,
    favorites:[],
  }),
  
  actions: {

    setDetallePokemon(name) {
      this.item=name
    },
    setLoading(loading) {
      console.log(loading,'loading Store')
      this.loading = loading;
    },

    setFavorites(name) {
      
      this.favorites = name;
    
    },
    removeFavorite(name) {
      this.favorites = this.favorites.filter((favorite) => favorite !== name)
    },

    async pokemon(name) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (response.status !== 200) {
          throw new Error('Error al obtener los datos')
        }
        this.item = response.data
       
      } catch (error) {
        this.error = error.message
      } finally {
      
      }
    },



    async pokemonsList() {
      try {
        for (let i = 1; i <= 151; i++) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          if (response.status !== 200) {
            throw new Error('Error al obtener los datos')
          }
          this.names.push(response.data.name)
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = true
      }
    },
  },
  getters: {
    getNames(state) {
      return state.names
    },
    
    getFavorites(state) {
      console.log(state.favorites,'store geter')
      return state.favorites
    },
    getPokemon(state) {
      const item = state?.item;
      if (!item) {
       return null; 
     }
    
      const types = Array.isArray(item.types) ? item.types.map((type) => type?.type?.name).join(', ') : '';
     
         return {
          name: item.name,
          id: item.id,
          image: item.sprites?.other?.['official-artwork']?.front_default,
          types: types,
          weight: item.weight,
        };
    }
  }
  })
  
