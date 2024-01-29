import { usePokemonStore } from "../../store/index.js";
import { computed, ref } from "vue";
export const useFavorites = () => {
  const store = usePokemonStore();
  const searchTerm = ref('');
  const favoritePokemon = computed(() => store.getFavorites);

  const toggleFavorite = (pokemonName) => {
    const index = favoritePokemon.value.indexOf(pokemonName);
    if (index === -1) {
      store.setFavorites(pokemonName);
    } else {
      store.removeFavorite(pokemonName);
    }
  };
  
  console.log(favoritePokemon.value, "favoritePokemon.value");
  return {
    toggleFavorite,
    favoritePokemon,
    searchTerm,
  };
};
