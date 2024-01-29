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
    height: 100vh;
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
  