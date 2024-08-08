import { computed, ref } from "vue";
import { usePokemonStore } from "../../store/index.js";
import { useLoader } from "../../../components/loader/composable.js";

export const useGetPokemons = () => {
  const store = usePokemonStore();
  const { isLoading, startLoader, stopLoader } = useLoader();
  const favoritePokemon = ref([]);
  const pokemons = computed(() => store.getPokemonNames);
  const pokemon = ref(null);
  const searchTerm = ref("");

  const getPokemonsList = async () => {
    try {
      startLoader();
      await store.loadPokemons();
    } catch (error) {
      console.error("Error al cargar los pokemons:", error);
    } finally {
      stopLoader();
    }
  };
  const transformPokemonData = (data) => {
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type) => type.type.name),
      image: data.sprites.other["official-artwork"].front_default,
    };
  };
  const pokemonDetail = async (name) => {
    console.log("pokemonDetail", name);
    store.reset(); // Resetea el estado antes de buscar nuevos detalles
    const pokemonData = store.allPokemons.find(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
    if (pokemonData) {
      await store.loadPokemonDetails(pokemonData.url);
      pokemon.value = transformPokemonData(store.getPokemonDetails);
    } else {
      pokemon.value = null;
    }
  };

  const resetCard = () => {
    pokemon.value = null;
    store.reset(); // Resetea el estado cuando se resetea la tarjeta
  };
  const toggleFavorite = (pokemonName) => {
    const index = favoritePokemon.value.indexOf(pokemonName);
    if (index === -1) {
      favoritePokemon.value.push(pokemonName);
    } else {
      favoritePokemon.value.splice(index, 1);
    }

    store.setFavorites([...favoritePokemon.value]);
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
