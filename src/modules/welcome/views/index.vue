<template>
  <div class="welcome-view">
    <img
      src="../../../assets/pikachu.svg"
      alt="Welcome Image"
      class="welcome-image"
    />
    <h1 class="welcome-title">Welcome to Pokédex</h1>
    <p class="welcome-text">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <button class="get-started-button" @click="goTopokemonsList">
      Get started
    </button>
  </div>
</template>

<script setup>
import { useWelcome } from "../composable/index.js";

const { goTopokemonsList } = useWelcome();
</script>

<style>
.welcome-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome-image {
  width: 325px;
  height: 288px;
  margin-top: 70px;
  margin-left: 25px;
}

.welcome-title {
  font-family: Lato;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 50px;
}

.welcome-text {
  font-family: Lato;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 20px;
}

.get-started-button {
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
}
</style>
