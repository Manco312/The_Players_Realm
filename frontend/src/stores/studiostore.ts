import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { StudioInterface } from '@/interfaces/StudioInterface';

export const useStudioStore = defineStore('studio', () => {
  const studios = ref<StudioInterface[]>([]);

  return { studios };
});
