<template>
  <div>
    <div v-if="isLoading" class="modal-loader">
      <loaderPokemon :isLoading="isLoading" />
    </div>
    <div
      class="modal"
      v-show="showModal && !isLoading"
      tabindex="-1"
      @click.self="closeModal"
    >
      <div class="dialog">
        <div class="content">
          <div class="header">
            <div class="card">
              <div class="close-btn" @click="closeModal">X</div>
              <img
                class="pokemon-image"
                :src="pokemon?.image || ''"
                alt="Pokemon Image"
              />
            </div>
          </div>
          <div class="body">
            <div class="pokemon-details" v-if="pokemon">
              <div class="details-item">
                <span>Name:</span> {{ pokemon.name || "N/A" }}
              </div>
              <div class="details-item">
                <span>Weight:</span> {{ pokemon.weight || "N/A" }}kg
              </div>
              <div class="details-item">
                <span>Types:</span> {{ pokemon.types?.join(", ") || "N/A" }}
              </div>
            </div>
            <div class="bottom-section">
              <button @click="sharePk" class="btn button">
                Share to my friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="position-fixed top-0 end-0 p-3 toast-container"
      style="z-index: 1050"
    >
      <div
        id="liveToast"
        class="toast hide"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">Pokémon Shared</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">Pokémon details copied to clipboard!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";
import { Toast } from "bootstrap";
import loaderPokemon from "./loader/loader.vue";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  showModal: {
    type: Boolean,
    required: true,
  },
  isFavorite: {
    type: Boolean,
  },
  isLoading: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:showModal"]);

const closeModal = () => {
  emit("update:showModal", false);
};

const sharePk = () => {
  const types = Array.isArray(props.pokemon.types)
    ? props.pokemon.types.join(", ")
    : props.pokemon.types || "N/A";
  const pokemonData = `${props.pokemon.name || "N/A"}, ${
    props.pokemon.weight || "N/A"
  }kg, ${types}`;
  navigator.clipboard.writeText(pokemonData).then(() => {
    const toastEl = document.getElementById("liveToast");
    const toast = new Toast(toastEl);
    toast.show();
  });
};
</script>
