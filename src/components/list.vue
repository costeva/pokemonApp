<template>
  <div class="list">
    <span @click="openCard" class="pokemon-name">{{ pokemonName }}</span>
    <img
      :src="favoriteIcon"
      alt="Favorite Icon"
      class="favorite-icon"
      @click="toggleFavorite"
    />
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import activeIcon from "../assets/Active.svg";
import disabledIcon from "../assets/Disabled.svg";

const { isFavorite: initialIsFavorite, pokemonName } = defineProps({
  isFavorite: {
    type: Boolean,
    default: false,
  },
  pokemonName: {
    type: String,
  },
});

const isFavorite = ref(initialIsFavorite);
const emit = defineEmits(["toggle-favorite", "open-card"]);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  emit("toggle-favorite", pokemonName);
};

const openCard = () => {
  emit("open-card", { pokemon: pokemonName, isFavorite: isFavorite.value});
};

const favoriteIcon = computed(() => {
  return isFavorite.value ? activeIcon : disabledIcon;
});
</script>

<style scoped>
.pokemon-name {
  font-family: Lato;
  font-size: 22px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 3rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 25px 10px;
  border-radius: 5px;
  margin: 10px 0;
}
</style>
