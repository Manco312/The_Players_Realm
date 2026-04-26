// Made by: Luciana Hoyos and Juan Pablo

// External Imports
import axiosInstance from '@/api/axiosInstance';

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import { COUNTRY_CODE_MAP } from '@/constants/countryCodeMap';
import type { CreateStudioDTO } from '@/dtos/CreateStudioDTO';
import type { UpdateStudioDTO } from '@/dtos/UpdateStudioDTO';
import type { StudioInterface } from '@/interfaces/StudioInterface';

export class StudioService {
  static async getStudios(): Promise<StudioInterface[]> {
    const { data: studios } = await axiosInstance.get<StudioInterface[]>('/api/studios');
    return studios;
  }

  static async getStudioById(id: number): Promise<StudioInterface | null> {
    try {
      const { data: studio } = await axiosInstance.get<StudioInterface>(`/api/studios/${id}`);
      return studio;
    } catch {
      return null;
    }
  }

  static async createStudio(studio: CreateStudioDTO): Promise<StudioInterface> {
    const { data: createdStudio } = await axiosInstance.post<StudioInterface>(
      '/api/studios',
      studio,
    );
    return createdStudio;
  }

  static async updateStudio(id: number, studio: UpdateStudioDTO): Promise<StudioInterface> {
    const { data: updatedStudio } = await axiosInstance.patch<StudioInterface>(
      `/api/studios/${id}`,
      studio,
    );
    return updatedStudio;
  }

  static async deleteStudio(id: number): Promise<void> {
    await axiosInstance.delete(`/api/studios/${id}`);
  }

  static getStudioCountByCountry(studios: StudioInterface[]): Record<string, number> {
    const countryCounts: Record<string, number> = {};

    studios.forEach((studio) => {
      const isoCode = COUNTRY_CODE_MAP[studio.country] || studio.country;

      if (isoCode) {
        countryCounts[isoCode] = (countryCounts[isoCode] || 0) + 1;
      }
    });

    return countryCounts;
  }

  static getCountryWithMostStudios(
    studios: StudioInterface[],
  ): { country: string; count: number } | null {
    const countryCounts = this.getStudioCountByCountry(studios);
    const entries = Object.entries(countryCounts);

    if (entries.length === 0) return null;

    const [country, count] = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max,
    );

    return { country, count };
  }

  static getCountryWithLeastStudios(
    studios: StudioInterface[],
  ): { country: string; count: number } | null {
    const countryCounts = this.getStudioCountByCountry(studios);
    const entries = Object.entries(countryCounts);

    if (entries.length === 0) return null;

    const [country, count] = entries.reduce((min, current) =>
      current[1] < min[1] ? current : min,
    );

    return { country, count };
  }

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
