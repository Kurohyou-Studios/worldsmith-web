import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

const useToolStore = defineStore('tool', () => {
  const active = ref('');
  return {
    active
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToolStore, import.meta.hot))
}

export default useToolStore