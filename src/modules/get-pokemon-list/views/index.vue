<template>
  <div>
    <loader-pokemon :isLoading="isLoading" />

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
    :isLoading="isLoading"
    :isFavorite="isFavorite"
    :showModal="showModal"
    :pokemon="pokemon"
    @update:showModal="handleCloseCard"
  />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, inject } from "vue";
import { useGetPokemons } from "../composable/index.js";
import listPokemons from "../../../components/list.vue";
import loaderPokemon from "../../../components/loader/loader.vue";
import cardPoket from "../../../components/cardPokemon.vue";

const showFooter = inject("showFooter");
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
  let filterName = pokemons.value.filter((pokemon) => {
    return pokemon.toLowerCase().includes(searchTxt);
  });
  showFooter.value = filterName.length !== 0;
  return filterName;
});

const handleOpenCard = (data) => {
  console.log(data.pokemon, "data");
  console.log(data, "DATA");
  isFavorite.value = data.isFavorite;
  pokemonDetail(data.pokemon);
  showModal.value = true;
};

const handleCloseCard = () => {
  showModal.value = false;
  resetCard();
};

const handleScroll = () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 10;

  if (bottomOfWindow && !isLoading.value) {
    getPokemonsList();
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await getPokemonsList();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

console.log(pokemon, "pokemon");
</script>

<style scoped>
.pokedex {
  text-align: center;
  position: relative;
}
.altura {
  height: 80vh;
}
.fas {
  color: #bfbfbf;
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

.input-group {
  width: 100% !important;
}
.input-group-text {
  background: #ffffff;
  border-right: #ffffff;
}

.input-search {
  flex-wrap: nowrap;
  padding: 14px 127px 14px 15px;
  border-radius: 5px;
  border-left: #ffffff;
}
@media (min-width: 1024px) {
  .input-group-text {
    background: #ffffff;
    border-right: #ffffff;
  }
  .input-search {
    padding: 14px 219px 14px 15px;
    border-radius: 5px;
    border-left: #ffffff;
  }
}
</style>
