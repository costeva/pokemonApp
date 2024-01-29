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
        <i class="bi bi-list"></i> ALL
      </button>
      <button
        class="btn footer-btn"
        :style="favoritesButtonStyle"
        @click="goToFavorite"
      >
        <i class="bi bi-heart"></i> Favorites
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

console.log(loading.value, 'VALOR DEL LOADING');

const allButtonStyle = ref({
  width: "150px",
  height: "44px",
  padding: "11px 48px",
  borderRadius: "60px",
  gap: "10px",
  background: "#F22539",
});

const favoritesButtonStyle = ref({
  width: "150px",
  height: "44px",
  padding: "11px 48px",
  borderRadius: "60px",
  gap: "10px",
  background: "#BFBFBF",
});

const goToList = () => {
  router.push("/list-pokemon");
};

const goToFavorite = () => {
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  margin: 0 20px; 
}


</style>
