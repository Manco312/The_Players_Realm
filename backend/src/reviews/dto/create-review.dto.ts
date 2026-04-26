// Author: Luciana Hoyos

// External Imports
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @Type(() => Number)
  @IsNumber()
  videogameId: number;
}
