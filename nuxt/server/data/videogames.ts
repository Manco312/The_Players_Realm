// Made by: Santiago Manco

// Internal Imports
import type { Videogame } from '~/types/videogame'

// Variables
export const videogames: Videogame[] = [
  {
    id: 1,
    name: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    description:
      'An epic open-world RPG with a rich narrative, complex characters, and a massive world to explore across multiple regions.',
    online: false,
    price: 39.99,
    totalSales: 50000000,
    releaseYear: 2015,
    director: 'Konrad Tomaszkiewicz',
    studio: 'CD Projekt Red',
  },
  {
    id: 2,
    name: 'God of War',
    genre: 'Action-Adventure',
    description:
      'Follow Kratos and his son Atreus on a breathtaking journey through the Norse realms in this stunning action-adventure.',
    online: false,
    price: 49.99,
    totalSales: 23000000,
    releaseYear: 2018,
    director: 'Cory Barlog',
    studio: 'Santa Monica Studio',
  },
  {
    id: 3,
    name: 'Elden Ring',
    genre: 'Action RPG',
    description:
      'A challenging open-world action RPG set in the Lands Between, created in collaboration with George R.R. Martin.',
    online: true,
    price: 59.99,
    totalSales: 25000000,
    releaseYear: 2022,
    director: 'Hidetaka Miyazaki',
    studio: 'FromSoftware',
  },
  {
    id: 4,
    name: 'Hollow Knight',
    genre: 'Metroidvania',
    description:
      'A challenging and beautifully crafted action-adventure through the vast underground kingdom of Hallownest.',
    online: false,
    price: 14.99,
    totalSales: 5000000,
    releaseYear: 2017,
    director: 'William Pellen',
    studio: 'Team Cherry',
  },
  {
    id: 5,
    name: 'Cyberpunk 2077',
    genre: 'Action RPG',
    description:
      'An open-world RPG set in futuristic Night City where you play as V, a mercenary outlaw going after a one-of-a-kind implant.',
    online: false,
    price: 59.99,
    totalSales: 25000000,
    releaseYear: 2020,
    director: 'Adam Badowski',
    studio: 'CD Projekt Red',
  },
  {
    id: 6,
    name: 'Valorant',
    genre: 'Tactical Shooter',
    description:
      'A character-based 5v5 tactical shooter where precise gunplay meets unique agent abilities in near-future Earth.',
    online: true,
    price: 0,
    totalSales: 0,
    releaseYear: 2020,
    director: 'Joe Ziegler',
    studio: 'Riot Games',
  },
]
