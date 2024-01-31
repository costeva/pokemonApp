import { defineStore } from "pinia";
import axios from "axios";
export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    loading: false,
    item: [],
    names: [],
    error: null,
    favorites: [],
  }),

  actions: {
    setCleanLading() {
      this.loading = false;
    },

    setCleanPokemon() {
      this.item = [];
    },

    setDetallePokemon(name) {
      this.item = name;
    },
    setLoading(loading) {
      this.loading = loading;
    },

    setFavorites(name) {
      this.favorites = name;
    },
    removeFavorite(name) {
      this.favorites = this.favorites.filter((favorite) => favorite !== name);
    },

    async pokemon(name) {
      let pokemonName =name.toLowerCase();
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        this.item = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
      }
    },

    async pokemonsList() {
      try {
        for (let i = 1; i <= 151; i++) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          if (response.status !== 200) {
            throw new Error("Error al obtener los datos");
          }
          this.names.push(response.data.name);
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = true;
      }
    },
  },
  getters: {
    getNames(state) {
      return state?.names.map((name) => name.charAt(0).toUpperCase() + name.slice(1));
    },

    getFavorites(state) {
      return state.favorites;
    },
    getPokemon(state) {
      const item = state?.item;
      if (!item) {
        return null;
      }

      const types = Array.isArray(item.types)
        ? item.types.map((type) => type?.type?.name).join(", ")
        : "";

      const name = item?.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : "";
      return {
        name: name,
        id: item.id,
        image: item.sprites?.other?.["official-artwork"]?.front_default,
        types: types,
        weight: item.weight,
      };
    },
  },
});
