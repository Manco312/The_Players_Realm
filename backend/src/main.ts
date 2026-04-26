// Author: Santiago Manco

// External Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Internal Imports
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Backend running on http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

void bootstrap();
