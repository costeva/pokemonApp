import { usePokemonStore } from "../../store/index.js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useFavorites = () => {
  const store = usePokemonStore();
  const searchTerm = ref("");
  const router = useRouter();
  const favoritePokemon = computed(() => [...store.getFavorites]);
  const pokemon = ref(null);

  const toggleFavorite = (pokemonName) => {
    const index = favoritePokemon.value.indexOf(pokemonName);
    if (index === -1) {
      store.setFavorites(pokemonName);
    } else {
      store.removeFavorite(pokemonName);
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
    store.reset();
    const pokemonData = store.allPokemons.find(
      (pokemon) => pokemon.name.toLowerCase() === name.pokemon.toLowerCase()
    );
    if (pokemonData) {
      await store.loadPokemonDetails(pokemonData.url);
      pokemon.value = transformPokemonData(store.getPokemonDetails);
    } else {
      pokemon.value = null;
    }
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
