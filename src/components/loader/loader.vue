<template>
  <div v-if="isLoading" class="pokeball-loader">
    <img src="../../assets/Loader.svg" alt="Pokeball" class="pokeball-image" />
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: Boolean,
});
</script>

<style scoped>
.pokeball-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Asegúrate de que el loader esté por encima del contenido */
}

.pokeball-image {
  width: 220px;
  height: 200px;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
