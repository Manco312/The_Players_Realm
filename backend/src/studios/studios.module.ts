import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { Studio } from './entities/studio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudiosController],
  providers: [StudiosService],
  exports: [StudiosService],
})
export class StudiosModule {}
