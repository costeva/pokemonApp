import { ref } from 'vue';

export function useLoader() {
  const isLoading = ref(false);

  function startLoader() {
    isLoading.value = true;
  }

  function stopLoader() {
    isLoading.value = false;
  }

  return {
    isLoading,
    startLoader,
    stopLoader
  };
}