import { Module } from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { VideogamesController } from './videogames.controller';

@Module({
  controllers: [VideogamesController],
  providers: [VideogamesService],
  exports: [VideogamesService],
})
export class VideogamesModule {}
