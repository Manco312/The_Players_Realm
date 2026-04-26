// Author: Juan Pablo Padilla

// External Imports
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  foundedYear: number;
}
