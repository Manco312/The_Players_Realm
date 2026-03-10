// Made by: Santiago Manco
import type { StudioInterface } from '@/interfaces/StudioInterface';
import type { ChartData } from '@/types/ChartTypes';

function getStudiosByCountry(studios: StudioInterface[]): ChartData {
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

export default {
  getStudiosByCountry,
};
