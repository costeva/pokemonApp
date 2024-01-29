<template>
  <div>
    <div class="container">
      <router-view />
    </div>

    <footer v-if="currentRoute !== '/'" class="footer">
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

const router = inject("router");

const currentRoute = computed(() => router.currentRoute.value.path);

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
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #f8f9fa; /* Color de fondo del footer */
}

.footer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  margin: 0 20px; /* Espacio entre botones */
}

/* Agrega estilos específicos para los botones si es necesario */
</style>
