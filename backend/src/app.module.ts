import { Module } from '@nestjs/common';
import { StudiosModule } from './studios/studios.module';

@Module({
  imports: [StudiosModule],
})
export class AppModule {}
