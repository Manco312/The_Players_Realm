// Made by: Santiago Manco
import type { VideogameInterface } from '@/interfaces/VideogameInterface';
import type { ChartData } from '@/types/ChartTypes';

function getVideogamesByGenre(videogames: VideogameInterface[]): ChartData {
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

function getSalesByGame(videogames: VideogameInterface[]): ChartData {
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

function getGamesByReleaseYear(videogames: VideogameInterface[]): ChartData {
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

export default {
  getVideogamesByGenre,
  getSalesByGame,
  getGamesByReleaseYear,
};
