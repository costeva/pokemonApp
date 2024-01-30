import { computed, ref } from "vue";
import { usePokemonStore } from "../../store/index.js";
import { useLoader } from "../../../components/loader/composable.js";

export const useGetPokemons = () => {
  const store = usePokemonStore();
  const { isLoading, startLoader, stopLoader } = useLoader();
  const favoritePokemon = ref([]);
  const pokemons = computed(() => store.getNames);
  const pokemon = computed(() => store.getPokemon);
  const searchTerm = ref("");

  const getPokemonsList = async () => {
    try {
      startLoader();
      await store.pokemonsList();
     
    } catch (error) {
      console.error("Error al cargar los pokemons:", error);
      startLoader();
    } finally {
      stopLoader();
      store.setLoading(true);
    }
  };

  const pokemonDetail = async (name) => {
    await store.pokemon(name);
   
  };

  const resetCard = () => {
    store.setCleanPokemon();
  };

  const toggleFavorite = (pokemonName) => {
    const index = favoritePokemon.value.indexOf(pokemonName);
    if (index === -1) {
      favoritePokemon.value.push(pokemonName);
    } else {
      favoritePokemon.value.splice(index, 1);
    }

    store.setFavorites([...favoritePokemon.value])
  };

  const clearSearch = () => {
    searchTerm.value = "";
  };

  return {
    pokemons,
    searchTerm,
    pokemonDetail,
    getPokemonsList,
    isLoading,
    favoritePokemon,
    toggleFavorite,
    resetCard,
    clearSearch,
    pokemon,
  };
};
