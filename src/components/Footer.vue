<template>
  <footer class="footer">
    <button class="btn footer-btn" :style="allButtonStyle" @click="goToList">
      <img src="../assets/all_btn.svg" alt="All" class="btn-icon" /> ALL
    </button>
    <button
      class="btn footer-btn"
      :style="favoritesButtonStyle"
      @click="goToFavorite"
    >
      <img src="../assets/estrella_btn.svg" alt="Favorites" class="btn-icon" />
      Favorites
    </button>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "../modules/store/index.js";

const router = useRouter();
const pokemonStore = usePokemonStore();

const currentRoute = computed(() => router.currentRoute.value.path);

const buttonStyle = (route) =>
  computed(() => ({
    width: window.innerWidth > 1024 ? "275px" : "150px",
    height: "44px",
    padding: "11px 48px",
    borderRadius: "60px",
    gap: "10px",
    color: "white",
    background: currentRoute.value === route ? "#F22539" : "#BFBFBF",
    display: "flex",
  }));

const allButtonStyle = buttonStyle("/list-pokemon");
const favoritesButtonStyle = buttonStyle("/favorite-pokemon");

const goToList = () => {
  router.push("/list-pokemon");
  pokemonStore.setLoading(false);
};

const goToFavorite = () => {
  router.push("/favorite-pokemon");
};
</script>
