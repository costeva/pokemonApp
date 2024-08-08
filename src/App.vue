Aquí tienes una versión de tu vista con los elementos no utilizados eliminados:
vue Copiar código
<template>
  <div class="app-container">
    <loaderPokemon :isLoading="isLoading" />
    <div class="content">
      <router-view />
    </div>
    <Footer v-if="currentRoute !== '/'" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import Footer from "./components/Footer.vue";
import { usePokemonStore } from "./modules/store/index.js";
import loaderPokemon from "./components/loader/loader.vue";
const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.path);

const pokemonStore = usePokemonStore();
const isLoading = computed(() => pokemonStore.loading);
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding-bottom: 80px;
}
</style>
