// Made by: Santiago Manco

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import { useStudioStore } from '@/stores/studiostore';

export class StudioService {
  static getStudios() {
    return useStudioStore().studios;
  }

  static getStudioById(id: number) {
    return useStudioStore().studios.find((studio) => studio.id === id);
  }

  static getTotalStudios(): number {
    return useStudioStore().studios.length;
  }

  static getUniqueCountries(): string[] {
    const studios = useStudioStore().studios;
    return [...new Set(studios.map((studio) => studio.country))];
  }

  static deleteStudio(id: number): void {
    const store = useStudioStore();
    const index = store.studios.findIndex((studio) => studio.id === id);
    if (index !== -1) {
      store.studios.splice(index, 1);
    }
  }

  static getStudiosByCountry(): ChartData {
    const studios = useStudioStore().studios;
    const countryCounts: Record<string, number> = {};

    studios.forEach((studio) => {
      countryCounts[studio.country] = (countryCounts[studio.country] || 0) + 1;
    });

    return {
      labels: Object.keys(countryCounts),
      datasets: [
        {
          label: 'Studios by Country',
          data: Object.values(countryCounts),
          backgroundColor: ['#5CE1E6', '#DC9E82', '#C16E70', '#F2F3D9', '#151E3F'],
          borderColor: '#030027',
          borderWidth: 2,
        },
      ],
    };
  }
}
