// Author: Santiago Manco

// External Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Imports
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudiosModule } from './studios/studios.module';
import { VideogamesModule } from './videogames/videogames.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './users/entities/user.entity';
import { Studio } from './studios/entities/studio.entity';
import { Videogame } from './videogames/entities/videogame.entity';
import { Review } from './reviews/entities/review.entity';
import { SeedService } from './database/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      entities: [User, Studio, Videogame, Review],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Studio, Videogame, Review]),
    AuthModule,
    UsersModule,
    StudiosModule,
    VideogamesModule,
    ReviewsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
