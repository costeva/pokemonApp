import { ref } from "vue";

export function useLoader() {
  const isLoading = ref(false);

  function startLoader() {
    isLoading.value = true;
  }

  function stopLoader() {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }

  return {
    isLoading,
    startLoader,
    stopLoader,
  };
}
