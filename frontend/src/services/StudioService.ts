// Made by: Santiago Manco

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import type { StudioInterface } from '@/interfaces/StudioInterface';

export class StudioService {
  static getStudiosByCountry(studios: StudioInterface[]): ChartData {
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
