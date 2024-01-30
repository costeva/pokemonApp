<template>
  <div>
    <loader-pokemon :isLoading="isLoading" />

    <div class="row justify-content-center" v-show="!isLoading">
      <input type="text" v-model="searchTerm" placeholder="Search..." />

      <div v-if="filteredPokemons.length === 0">
        <h2>Uh-oh!</h2>
        <p>You look lost on your journey!</p>
        <button class="btn get-back--home-button" @click="clearSearch">
          Go back home
        </button>
      </div>

      <div class="py-2 col-sm-12" v-else>
        <list-pokemons
          v-for="(pokemon, index) in filteredPokemons"
          :key="index"
          :pokemonName="pokemon"
          @toggle-favorite="toggleFavorite"
          @open-card="handleOpenCard"
        />
      </div>
    </div>
  </div>
  <card-poket
    v-if="showModal"
    :showModal="showModal"
    :pokemon="pokemon"
    @update:showModal="handleCloseCard"
  />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useGetPokemons } from "../composable/index.js";
import listPokemons from "../../../components/list.vue";
import loaderPokemon from "../../../components/loader/loader.vue";
import cardPoket from "../../../components/cardPokemon.vue";

const {
  getPokemonsList,
  isLoading,
  toggleFavorite,
  searchTerm,
  clearSearch,
  pokemon,
  pokemons,
  resetCard,
  pokemonDetail,
} = useGetPokemons();
const showModal = ref(false);

const filteredPokemons = computed(() => {
  const serchTxt = searchTerm.value.toLowerCase();
  let filterName = pokemons.value.filter((pokemon) => {
    return pokemon.toLowerCase().includes(serchTxt);
  });
  return filterName;
});

const handleOpenCard = (pokemon) => {
  pokemonDetail(pokemon);
  showModal.value = true;
};

const handleCloseCard = () => {
  showModal.value = false;
  resetCard();
};

onMounted(async () => {
  await getPokemonsList();
});
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

.get-back--home-button {
  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  background-color: red !important;
  color: white;
  border-radius: 60px;
  margin-top: 20px;
}
</style>
