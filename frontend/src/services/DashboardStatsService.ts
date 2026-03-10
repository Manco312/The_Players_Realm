// Made by: Santiago Manco
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import type { StudioInterface } from '@/interfaces/StudioInterface';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

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

function getRatingDistribution(reviews: ReviewInterface[]): ChartData {
  const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });

  return {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Rating Distribution',
        data: Object.values(ratingCounts),
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

function getTotalReviews(reviews: ReviewInterface[]): number {
  return reviews.length;
}

function getTotalUsers(users: UserInterface[]): number {
  return users.length;
}

function getAdminUsers(users: UserInterface[]): UserInterface[] {
  return users.filter((user) => user.role === 'Admin');
}

export default {
  getVideogamesByGenre,
  getSalesByGame,
  getStudiosByCountry,
  getRatingDistribution,
  getGamesByReleaseYear,
  getTotalReviews,
  getTotalUsers,
  getAdminUsers,
};
