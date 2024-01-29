import { usePokemonStore } from "../../store/index.js";
import { computed, ref } from "vue";
 
export const useFavorites = () => {
  const store = usePokemonStore();
  const searchTerm = ref('');
  const favoritePokemon = computed(() => store.getFavorites);
  const pokemon = computed(() => store.getPokemon);
  const toggleFavorite = (pokemonName) => {
    const index = favoritePokemon.value.indexOf(pokemonName);
    if (index === -1) {
      store.setFavorites(pokemonName);
    } else {
      store.removeFavorite(pokemonName);
    }
  };

  const pokemonDetail = async (name) => {
    await store.pokemon(name);
  };
  

  
  return {
    toggleFavorite,
    favoritePokemon,
    searchTerm,
    pokemon,
    pokemonDetail,
  };
};
