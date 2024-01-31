import { usePokemonStore } from "../../store/index.js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
 
export const useFavorites = () => {
  const store = usePokemonStore();
  const searchTerm = ref('');
  const router = useRouter();
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
    let pokemonName = name.pokemon.toLowerCase();
    await store.pokemon(pokemonName);
  };

  const backToHome = () => {
    store.setLoading(false);
    router.push({ name: "listPokemon" });
  };
  
  return {
    toggleFavorite,
    favoritePokemon,
    searchTerm,
    pokemon,
    backToHome,
    pokemonDetail,
  };
};
