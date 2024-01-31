<template>
  <div class="row justify-content-center">
    <div class="input-group">
      <span class="input-group-text">
        <i class="fas fa-search"></i>
      </span>
      <input
        v-model="searchTerm"
        class="form-control input-search"
        placeholder="Search"
      />
    </div>
  </div>
  <div v-if="filteredPokemons.length === 0">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <button class="btn get-back--home-button" @click="backToHome">
      Go back home
    </button>
  </div>
  <list-pokemons
    v-for="(pokemon, index) in filteredPokemons"
    :key="index"
    :pokemonName="pokemon"
    @toggle-favorite="toggleFavorite"
    :isFavorite="favoritePokemon.includes(pokemon)"
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
import { ref, computed, inject } from "vue";
import cardPokemon from "../../../components/cardPokemon.vue";
import listPokemons from "../../../components/list.vue";
import { useFavorites } from "../composable/index.js";
const showFooter = inject("showFooter");
const {
  toggleFavorite,
  favoritePokemon,
  searchTerm,
  pokemonDetail,
  pokemon,
  backToHome,
} = useFavorites();

const showModal = ref(false);
const handleOpenCard = (pokemon) => {
  pokemonDetail(pokemon);
  showModal.value = true;
};

const filteredPokemons = computed(() => {
  const searchTxt = searchTerm.value.toLowerCase();
  let filterName = []; // Añade esta línea
  if (Array.isArray(favoritePokemon.value)) {
    filterName = favoritePokemon.value.filter(
      (pokemonName) =>
        typeof pokemonName === "string" &&
        pokemonName.toLowerCase().includes(searchTxt)
    );
  }
  showFooter.value = filterName.length !== 0; // Mueve esta línea aquí
  return filterName;
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
.input-group-text {
  background: #ffffff;
  border-right: #ffffff;
}
.input-search {
  padding: 14px 219px 14px 15px;
  border-radius: 5px;
  border-left: #ffffff;
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
