import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export const useVideogameStore = defineStore('videogame', () => {
  const videogames = ref<VideogameInterface[]>([]);

  return { videogames };
});
