// Author: Luciana Hoyos

// External Imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal Imports
import { VideogamesService } from './videogames.service';
import { VideogamesController } from './videogames.controller';
import { Videogame } from './entities/videogame.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Videogame])],
  controllers: [VideogamesController],
  providers: [VideogamesService],
  exports: [VideogamesService],
})
export class VideogamesModule {}
