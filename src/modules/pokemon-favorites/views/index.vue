<template>
  <input type="text" v-model="searchTerm" placeholder="Search..." />
   <div v-if="filteredPokemons.length === 0">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <button class="btn get-back--home-button" @click="clearSearch">
      Go back home
    </button>
  </div>
  <list-pokemons
    v-for="(pokemon, index) in filteredPokemons"
    :key="index"
    :pokemonName="pokemon"
    @toggle-favorite="toggleFavorite"
    @open-card="handleOpenCard"
  />
  <card-pokemon
    v-if="showModal"
    :showModal="showModal"
    :pokemon="pokemon"
    @update:showModal="handleCloseCard"
  />  
</template>

<script setup>
import { ref, computed } from "vue";
import cardPokemon from "../../../components/cardPokemon.vue";
import listPokemons from "../../../components/list.vue";
import { useFavorites } from "../composable/index.js";

const { toggleFavorite, favoritePokemon, searchTerm } = useFavorites();

const showModal = ref(false);
const handleOpenCard = (pokemon) => {
  pokemonDetail(pokemon);
  showModal.value = true;
};

const filteredPokemons = computed(() => {
  const searchTxt = searchTerm.value.toLowerCase();
  if (Array.isArray(favoritePokemon.value)) {
    return favoritePokemon.value.filter(pokemonName => typeof pokemonName === 'string' && pokemonName.toLowerCase().includes(searchTxt));
  } else {
    return [];
  }
});

const handleCloseCard = () => {
  showModal.value = false;
};
</script>

<style scoped>
.pokedex {
  text-align: center;
  position: relative;
}
.altura {
  height: 80vh;
}

.pokeball-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
