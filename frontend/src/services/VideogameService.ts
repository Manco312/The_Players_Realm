// Made by: Santiago Manco

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import { useVideogameStore } from '@/stores/videogamestore';

export class VideogameService {
  static getVideogames() {
    return useVideogameStore().videogames;
  }

  static getVideogameById(id: number) {
    return useVideogameStore().videogames.find((game) => game.id === id);
  }

  static deleteVideogame(id: number) {
    const store = useVideogameStore();
    const index = store.videogames.findIndex((game) => game.id === id);
    if (index !== -1) {
      store.videogames.splice(index, 1);
    }
  }

  static getUniqueGenres(): string[] {
    const videogames = useVideogameStore().videogames;
    return [...new Set(videogames.map((game) => game.genre))];
  }

  static getTotalVideogames(): number {
    return useVideogameStore().videogames.length;
  }

  static getOnlineVsOffline(): ChartData {
    const videogames = useVideogameStore().videogames;
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

  static getVideogamesByGenre(): ChartData {
    const videogames = useVideogameStore().videogames;
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

  static getSalesByGame(): ChartData {
    const videogames = useVideogameStore().videogames;
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

  static getGamesByReleaseYear(): ChartData {
    const videogames = useVideogameStore().videogames;
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
          data: sortedYears.map((year) => yearCounts[Number(year)]),
          backgroundColor: '#5CE1E6',
          borderColor: '#030027',
          borderWidth: 1,
        },
      ],
    };
  }
}
