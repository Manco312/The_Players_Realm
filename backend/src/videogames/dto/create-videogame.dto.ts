import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateVideogameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return Boolean(value);
  })
  @IsBoolean()
  online: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalSales: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1970)
  releaseYear: number;

  @IsString()
  @IsOptional()
  director?: string;

  @Type(() => Number)
  @IsNumber()
  studioId: number;
}
