<template>
  <div>
    <loaderPokemon :isLoading="isLoading" />

    <div class="row justify-content-center px-3" v-show="!isLoading">
      <div>
        <div class="input-group col-12">
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
        <button class="btn get-back--home-button" @click="clearSearch">
          Go back home
        </button>
      </div>

      <div class="py-2 col-12" v-else>
        <listPokemons
          v-for="(pokemon, index) in filteredPokemons"
          :key="index"
          :pokemonName="pokemon"
          @toggle-favorite="toggleFavorite"
          @open-card="handleOpenCard"
        />
      </div>
    </div>
    <cardPoket
      v-if="showModal"
      :isLoading="isLoading"
      :isFavorite="isFavorite"
      :showModal="showModal"
      :pokemon="pokemon"
      @update:showModal="handleCloseCard"
    />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
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
const isFavorite = ref(false);

const filteredPokemons = computed(() => {
  const searchTxt = searchTerm.value.toLowerCase();
  return pokemons.value.filter((pokemon) =>
    pokemon.toLowerCase().includes(searchTxt)
  );
});

const handleOpenCard = (data) => {
  isFavorite.value = data.isFavorite;
  pokemonDetail(data.pokemon);
  showModal.value = true;
};

const handleCloseCard = () => {
  showModal.value = false;
  resetCard();
};

const isLoadingMore = ref(false);
const handleScroll = () => {
  if (isLoading.value || isLoadingMore.value) return;
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 10;

  if (bottomOfWindow) {
    isLoadingMore.value = true;
    getPokemonsList().then(() => {
      isLoadingMore.value = false;
    });
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await getPokemonsList();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
