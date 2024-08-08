<template>
  <div>
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
    <listPokemons
      v-for="(pokemon, index) in filteredPokemons"
      :key="pokemon"
      :pokemonName="pokemon"
      @toggle-favorite="toggleFavorite"
      :isFavorite="favoritePokemon.includes(pokemon)"
      @open-card="handleOpenCard"
    />
    <cardPokemon
      v-if="showModal"
      :showModal="showModal"
      :pokemon="pokemon"
      @update:showModal="handleCloseCard"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import cardPokemon from "../../../components/cardPokemon.vue";
import listPokemons from "../../../components/list.vue";
import { useFavorites } from "../composable/index.js";

const {
  toggleFavorite,
  favoritePokemon,
  searchTerm,
  pokemonDetail,
  pokemon,
  backToHome,
} = useFavorites();

const showModal = ref(false);

const handleOpenCard = (name) => {
  pokemonDetail(name);
  showModal.value = true;
};

const handleCloseCard = () => {
  showModal.value = false;
};

const filteredPokemons = computed(() => {
  const searchTxt = searchTerm.value.toLowerCase();
  if (!Array.isArray(favoritePokemon.value)) {
    return [];
  }
  return favoritePokemon.value.filter(
    (pokemonName) =>
      typeof pokemonName === "string" &&
      pokemonName.toLowerCase().includes(searchTxt)
  );
});
</script>
