<template>
  <div class="modal" v-show="props.showModal" tabindex="-1">
    <div class="dialog">
      <div class="content">
        <div class="header">
          <div class="card">
            <div class="close-btn" @click="closeModal">X</div>
            <img
              class="pokemon-image"
              :src="pokemon?.image"
              alt="Pokemon Image"
            />
          </div>
        </div>
        <div class="body">
          <div class="pokemon-details">
            <div class="details-item">
              <span>Name:</span> {{ pokemon?.name }}
            </div>
            <div class="details-item">
              <span>Weight:</span> {{ pokemon?.weight }}kg
            </div>
            <div class="details-item">
              <span>Types:</span> {{ pokemon?.types }}
            </div>
          </div>
          <div class="bottom-section">
            <button @click="sharePk" class="btn button">
              Share to my friends
            </button>
            <img :src="favoriteIcon" alt="Favorites" class="btn-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, watch } from "vue";
import activeIcon from "../assets/Active.svg";
import disabledIcon from "../assets/Disabled.svg";
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    default: null,
  },
  showModal: {
    type: Boolean,
    required: true,
  },
  isFavorite: {
    type: Boolean,   
  },
});

const emit = defineEmits(["update:showModal"]);

const closeModal = () => {
  emit("update:showModal", false);

};

  watch(
    () => props.pokemon,
    (newVal, oldVal) => {
      props.pokemon = newVal;
    },
    { immediate: true },
  )

const favoriteIcon = computed(() => {
  return props.isFavorite ? activeIcon : disabledIcon;
});

const sharePk = () => {
  const types = Array.isArray(props.pokemon.types)
    ? props.pokemon.types.join(", ")
    : props.pokemon.types;
  const pokemonData = `${props.pokemon.name}, ${props.pokemon.weight}kg, ${types}`;
  navigator.clipboard.writeText(pokemonData);
};




</script>

<style scoped>
.modal {
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}
.header {
  border-radius: 2px 2px 0rem 0rem;
  background-image: url("../assets/paisaje.svg");
  background-size: cover;
  height: 200px;
  position: relative;
}

.card {

  border-radius:0;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 255, 255, 0.1);
}

.pokemon-image {
  position: relative;
  max-height: 100%;
  opacity: 0.8;
}

.body {
  text-align: left;
  background-color: #f5f5f5;
  border-radius:  0rem 0rem 2px 2px;
}

.card {
  border-radius: 2px 2px 0rem 0rem;
 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-label {
  border-bottom: 1px solid gray;
}

.body {
  padding: 20px;
}

.pokemon-details {
  color: #5e5e5e;
}

.details-item {
  margin: 10px 0;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 20px;
}

.details-item:last-child {
  margin-bottom: 0;
}

.details-item span {
  font-weight: bold;
  color: #5E5E5E;
}


.bottom-section {
  align-items: end;
  display: flex;
}

.button {
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
  padding: 11px, 20px, 11px, 20px;
}

.close-btn {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
}

@media (min-width: 1024px) {
  .dialog {
    width: 570px;
    height: 506px;
    position: relative;
    top: 0px;
    left: 0px;
  }

  .bottom-section{
    display: flex;
    justify-content: space-between;
  }
}
</style>
