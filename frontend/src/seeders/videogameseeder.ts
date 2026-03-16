// Made by: Santiago Manco
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export const videogameSeeder: VideogameInterface[] = [
  {
    id: 1,
    name: 'The Witcher 3',
    genre: 'RPG',
    description: 'Open world RPG with deep storytelling.',
    online: false,
    price: 39.99,
    imageUrl: '/images/videogames/thewitcher3.png',
    totalSales: 50000000,
    releaseYear: 2015,
    director: 'Konrad Tomaszkiewicz',
    studioId: 1,
  },
  {
    id: 2,
    name: 'GTA V',
    genre: 'Action',
    description: 'Open world crime action game.',
    online: true,
    price: 29.99,
    imageUrl: '/images/videogames/gtav.png',
    totalSales: 180000000,
    releaseYear: 2013,
    director: 'Leslie Benzies',
    studioId: 2,
  },
  {
    id: 3,
    name: 'Zelda: Breath of the Wild',
    genre: 'Adventure',
    description: 'Open world adventure game.',
    online: false,
    price: 59.99,
    imageUrl: '/images/videogames/zelda.png',
    totalSales: 31000000,
    releaseYear: 2017,
    director: 'Hidemaro Fujibayashi',
    studioId: 3,
  },
];
