import { Module } from '@nestjs/common';
import { StudiosModule } from './studios/studios.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { VideogamesModule } from './videogames/videogames.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StudiosModule, ReviewsModule, UsersModule, VideogamesModule, AuthModule],
})
export class AppModule {}
