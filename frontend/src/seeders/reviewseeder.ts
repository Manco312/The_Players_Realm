// Made by: Santiago Manco
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export const reviewSeeder: ReviewInterface[] = [
  {
    id: 1,
    comment: 'Amazing RPG experience',
    rating: '5',
    userId: 2,
    videogameId: 1,
  },
  {
    id: 2,
    comment: 'Great story and graphics',
    rating: '4',
    userId: 3,
    videogameId: 1,
  },
  {
    id: 3,
    comment: 'One of the best open world games',
    rating: '5',
    userId: 2,
    videogameId: 2,
  },
  {
    id: 4,
    comment: 'Fantastic gameplay and exploration',
    rating: '5',
    userId: 3,
    videogameId: 3,
  },
];
