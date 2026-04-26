// Author: Santiago Manco

// External Imports
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Internal Imports
import { User } from '../users/entities/user.entity';
import { Studio } from '../studios/entities/studio.entity';
import { Videogame } from '../videogames/entities/videogame.entity';
import { Review } from '../reviews/entities/review.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Studio) private readonly studios: Repository<Studio>,
    @InjectRepository(Videogame)
    private readonly videogames: Repository<Videogame>,
    @InjectRepository(Review) private readonly reviews: Repository<Review>,
  ) {}

  async onApplicationBootstrap() {
    const userCount = await this.users.count();
    if (userCount > 0) return;

    this.logger.log('Seeding database with initial data...');

    const hashedAdmin = await bcrypt.hash('admin123', 10);
    const hashedUser = await bcrypt.hash('player123', 10);

    const [admin, player1, player2] = await this.users.save([
      {
        username: 'admin',
        email: 'admin@realm.com',
        password: hashedAdmin,
        role: 'Admin',
      },
      {
        username: 'player1',
        email: 'player1@realm.com',
        password: hashedUser,
        role: 'User',
      },
      {
        username: 'player2',
        email: 'player2@realm.com',
        password: hashedUser,
        role: 'User',
      },
    ]);

    const [cdProjekt, rockstar, nintendo] = await this.studios.save([
      { name: 'CD Projekt Red', country: 'Poland', foundedYear: 1994 },
      { name: 'Rockstar Games', country: 'United States', foundedYear: 1998 },
      { name: 'Nintendo', country: 'Japan', foundedYear: 1889 },
    ]);

    const [witcher, gta, zelda] = await this.videogames.save([
      {
        name: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        description: 'An open-world RPG set in a dark fantasy universe.',
        online: false,
        price: 39.99,
        imageUrl: '/images/videogames/thewitcher3.png',
        totalSales: 50000000,
        releaseYear: 2015,
        director: 'Konrad Tomaszkiewicz',
        studioId: cdProjekt.id,
      },
      {
        name: 'Grand Theft Auto V',
        genre: 'Action',
        description: 'An open-world action game set in Los Santos.',
        online: true,
        price: 29.99,
        imageUrl: '/images/videogames/gtav.png',
        totalSales: 185000000,
        releaseYear: 2013,
        director: 'Imran Sarwar',
        studioId: rockstar.id,
      },
      {
        name: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        description: 'An open-world adventure game set in Hyrule.',
        online: false,
        price: 59.99,
        imageUrl: '/images/videogames/zelda.png',
        totalSales: 32000000,
        releaseYear: 2017,
        director: 'Hidemaro Fujibayashi',
        studioId: nintendo.id,
      },
    ]);

    await this.reviews.save([
      {
        comment: 'Amazing RPG experience!',
        rating: '5',
        userId: player1.id,
        videogameId: witcher.id,
      },
      {
        comment: 'The best game I have ever played.',
        rating: '5',
        userId: player2.id,
        videogameId: gta.id,
      },
      {
        comment: 'Masterpiece of game design.',
        rating: '5',
        userId: admin.id,
        videogameId: zelda.id,
      },
      {
        comment: 'Good but a bit repetitive.',
        rating: '3',
        userId: player1.id,
        videogameId: gta.id,
      },
    ]);

    this.logger.log('Database seeded successfully!');
  }
}
