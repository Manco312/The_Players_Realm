import { Injectable, NotFoundException } from '@nestjs/common';
import { Videogame } from './entities/videogame.entity';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';

@Injectable()
export class VideogamesService {
  private videogames: Videogame[] = [];
  private nextId = 1;

  findAll(): Videogame[] {
    return this.videogames;
  }

  findOne(id: number): Videogame {
    const videogame = this.videogames.find((v) => v.id === id);
    if (!videogame) throw new NotFoundException(`Videogame #${id} not found`);
    return videogame;
  }

  create(createVideogameDto: CreateVideogameDto): Videogame {
    const videogame: Videogame = { id: this.nextId++, ...createVideogameDto };
    this.videogames.push(videogame);
    return videogame;
  }

  update(id: number, updateVideogameDto: UpdateVideogameDto): Videogame {
    const videogame = this.findOne(id);
    Object.assign(videogame, updateVideogameDto);
    return videogame;
  }

  remove(id: number): void {
    const index = this.videogames.findIndex((v) => v.id === id);
    if (index === -1) throw new NotFoundException(`Videogame #${id} not found`);
    this.videogames.splice(index, 1);
  }
}
