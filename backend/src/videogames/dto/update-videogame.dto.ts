// Author: Luciana Hoyos

// External Imports
import { PartialType } from '@nestjs/mapped-types';
import { CreateVideogameDto } from './create-videogame.dto';

export class UpdateVideogameDto extends PartialType(CreateVideogameDto) {}
