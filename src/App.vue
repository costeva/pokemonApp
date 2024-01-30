<template>
  <div>
    <div class="container">
      <router-view />
    </div>

    <footer v-show="currentRoute !== '/' && !(currentRoute === '/list-pokemon' && !loading)" class="footer">
      <button
        class="btn btn-primary footer-btn"
        :style="allButtonStyle"
        @click="goToList"
      >
      <img src="./assets/all_btn.svg" alt="Favorites" class="btn-icon" /> ALL
      </button>
      <button
        class="btn footer-btn"
        :style="favoritesButtonStyle"
        @click="goToFavorite"
      >
        <img src="./assets/estrella_btn.svg" alt="Favorites" class="btn-icon" />
        Favorites
      </button>
    </footer>
  </div>
</template>

<script setup>
import { inject, ref, computed } from "vue";
import { usePokemonStore } from "./modules/store/index.js";
const router = inject("router");
const pokemonStore = usePokemonStore();
const currentRoute = computed(() => router.currentRoute.value.path);
const loading = computed(() => pokemonStore.loading);
const colorBtn = ref('all');


const allButtonStyle =  computed(() =>({
  width: "150px",
  height: "44px",
  padding: "11px 48px",
  borderRadius: "60px",
  gap: "10px",
  background: colorBtn.value === 'all' ? '#F22539' : '#BFBFBF',
  display: "flex",
}));

const favoritesButtonStyle =  computed(() =>({
  width: "150px",
  height: "44px",
  padding: "11px 48px",
  borderRadius: "60px",
  gap: "10px",
  background: colorBtn.value === 'favorites' ? '#F22539' : '#BFBFBF',
  display: "flex",
}));

const goToList = () => {
  colorBtn.value = 'all';
  router.push("/list-pokemon");
  pokemonStore.setLoading(false);
};

const goToFavorite = () => {
  colorBtn.value = 'favorites';
  router.push("/favorite-pokemon");
};
</script>

<style>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #f8f9fa; 
}

.footer-btn {
  font-family: Lato;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  margin: 0 20px; 
}



</style>
