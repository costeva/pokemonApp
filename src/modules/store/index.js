import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    loading: false,
    pokemonData: null,
    items: [],
    error: null,
    favorites: [],
    offset: 0,
    limit: 20,
    allPokemons: [],
  }),

  actions: {
    setLoading(loading) {
      this.loading = loading;
    },

    setFavorites(name) {
      this.favorites = name;
    },

    removeFavorite(name) {
      this.favorites = this.favorites.filter((favorite) => favorite !== name);
    },

    reset() {
      this.pokemonData = null;
    },

    async loadPokemons() {
      this.setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`
        );
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }

        this.allPokemons.push(...response.data.results);
        this.offset += this.limit;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.setLoading(false);
      }
    },

    async loadPokemonDetails(url) {
      this.setLoading(true);
      try {
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        this.pokemonData = response.data;
        this.items.push(response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.setLoading(false);
      }
    },
  },

  getters: {
    getPokemonNames(state) {
      return state.allPokemons.map(
        (pokemon) =>
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      );
    },

    getPokemonDetails(state) {
      return state.pokemonData;
    },

    getFavorites(state) {
      return state.favorites;
    },
  },
});
