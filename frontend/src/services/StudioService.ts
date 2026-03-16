// Made by: Luciana Hoyos and Juan Pablo

import type { ChartData } from '@/types/ChartTypes';
import { useStudioStore } from '@/stores/studiostore';
import { COUNTRY_CODE_MAP } from '@/constants/countryCodeMap';
import type { CreateStudioDTO } from '@/dtos/CreateStudioDTO';
import type { StudioInterface } from '@/interfaces/StudioInterface';

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

  static getStudioCountByCountry(): Record<string, number> {
    const studios = useStudioStore().studios;
    const countryCounts: Record<string, number> = {};

    studios.forEach((studio) => {
      const isoCode = COUNTRY_CODE_MAP[studio.country] || studio.country;

      if (isoCode) {
        countryCounts[isoCode] = (countryCounts[isoCode] || 0) + 1;
      }
    });

    return countryCounts;
  }

  static getCountryWithMostStudios(): { country: string; count: number } | null {
    const countryCounts = this.getStudioCountByCountry();
    const entries = Object.entries(countryCounts);

    if (entries.length === 0) return null;

    const [country, count] = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max,
    );

    return { country, count };
  }

  static getCountryWithLeastStudios(): { country: string; count: number } | null {
    const countryCounts = this.getStudioCountByCountry();
    const entries = Object.entries(countryCounts);

    if (entries.length === 0) return null;

    const [country, count] = entries.reduce((min, current) =>
      current[1] < min[1] ? current : min,
    );

    return { country, count };
  }

  static getCountriesWithStudiosCount(): number {
    return Object.keys(this.getStudioCountByCountry()).length;
  }

  static getUniqueCountries(): string[] {
    const studios = useStudioStore().studios;
    return [...new Set(studios.map((studio) => studio.country))];
  }

  static createStudio(studio: CreateStudioDTO): void {
    const store = useStudioStore();
    const nextId = store.studios.length > 0 ? Math.max(...store.studios.map((s) => s.id)) + 1 : 1;

    store.studios.push({
      id: nextId,
      ...studio,
    });
  }

  static updateStudio(id: number, studio: Partial<StudioInterface>): void {
    const store = useStudioStore();
    const index = store.studios.findIndex((s) => s.id === id);
    if (index !== -1) {
      store.studios[index] = { ...store.studios[index], ...studio };
    }
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
