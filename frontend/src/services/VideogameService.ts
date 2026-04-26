// Made by: Santiago Manco

// External Imports
import axiosInstance from '@/api/axiosInstance';

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import type { CreateVideogameDTO } from '@/dtos/CreateVideogameDTO';
import type { UpdateVideogameDTO } from '@/dtos/UpdateVideogameDTO';
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export class VideogameService {
  static async getVideogames(): Promise<VideogameInterface[]> {
    const { data: videogames } = await axiosInstance.get<VideogameInterface[]>('/api/videogames');
    return videogames;
  }

  static async getVideogameById(id: number): Promise<VideogameInterface | null> {
    try {
      const { data: videogame } = await axiosInstance.get<VideogameInterface>(
        `/api/videogames/${id}`,
      );
      return videogame;
    } catch {
      return null;
    }
  }

  static async createVideogame(videogame: CreateVideogameDTO): Promise<VideogameInterface> {
    const { data: createdVideogame } = await axiosInstance.post<VideogameInterface>(
      '/api/videogames',
      videogame,
    );
    return createdVideogame;
  }

  static async updateVideogame(
    id: number,
    videogame: UpdateVideogameDTO,
  ): Promise<VideogameInterface> {
    const { data: updatedVideogame } = await axiosInstance.patch<VideogameInterface>(
      `/api/videogames/${id}`,
      videogame,
    );
    return updatedVideogame;
  }

  static async deleteVideogame(id: number): Promise<void> {
    await axiosInstance.delete(`/api/videogames/${id}`);
  }

  static getUniqueGenres(videogames: VideogameInterface[]): string[] {
    return [...new Set(videogames.map((game) => game.genre))];
  }

  static getOnlineVsOffline(videogames: VideogameInterface[]): ChartData {
    const onlineCount = videogames.filter((game) => game.online).length;
    const offlineCount = videogames.filter((game) => !game.online).length;

    return {
      labels: ['Online', 'Offline'],
      datasets: [
        {
          label: 'Online vs Offline',
          data: [onlineCount, offlineCount],
          backgroundColor: ['#5CE1E6', '#C16E70'],
          borderColor: '#030027',
          borderWidth: 2,
        },
      ],
    };
  }

  static getVideogamesByGenre(videogames: VideogameInterface[]): ChartData {
    const genreCounts: Record<string, number> = {};

    videogames.forEach((game) => {
      genreCounts[game.genre] = (genreCounts[game.genre] || 0) + 1;
    });

    return {
      labels: Object.keys(genreCounts),
      datasets: [
        {
          label: 'Games by Genre',
          data: Object.values(genreCounts),
          backgroundColor: ['#5CE1E6', '#DC9E82', '#C16E70', '#F2F3D9', '#151E3F'],
          borderColor: '#030027',
          borderWidth: 2,
        },
      ],
    };
  }

  static getSalesByGame(videogames: VideogameInterface[]): ChartData {
    const sortedGames = [...videogames].sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

    return {
      labels: sortedGames.map((game) => game.name),
      datasets: [
        {
          label: 'Total Sales (millions)',
          data: sortedGames.map((game) => Math.round(game.totalSales / 1000000)),
          backgroundColor: '#5CE1E6',
          borderColor: '#030027',
          borderWidth: 1,
        },
      ],
    };
  }

  static getGamesByReleaseYear(videogames: VideogameInterface[]): ChartData {
    const yearCounts: Record<number, number> = {};

    videogames.forEach((game) => {
      yearCounts[game.releaseYear] = (yearCounts[game.releaseYear] || 0) + 1;
    });

    const sortedYears = Object.keys(yearCounts).sort();

    return {
      labels: sortedYears,
      datasets: [
        {
          label: 'Games by Release Year',
          data: sortedYears.map((year) => yearCounts[Number(year)] ?? 0),
          backgroundColor: '#5CE1E6',
          borderColor: '#030027',
          borderWidth: 1,
        },
      ],
    };
  }
}
