import { computed } from "vue";

import { useRouter } from "vue-router";
export const useWelcome = () => {
  const router = useRouter();

  const goTopokemonsList = () => {
    router.push({ name: "listPokemon" });
  };

  return {
    goTopokemonsList,
  };
};
