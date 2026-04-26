import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Videogame } from './entities/videogame.entity';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';

@Injectable()
export class VideogamesService {
  constructor(@InjectRepository(Videogame) private readonly repo: Repository<Videogame>) {}

  findAll(): Promise<Videogame[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Videogame> {
    const game = await this.repo.findOne({ where: { id } });
    if (!game) throw new NotFoundException(`Videogame #${id} not found`);
    return game;
  }

  create(dto: CreateVideogameDto): Promise<Videogame> {
    const game = this.repo.create(dto);
    return this.repo.save(game);
  }

  async update(id: number, dto: UpdateVideogameDto): Promise<Videogame> {
    const game = await this.findOne(id);
    Object.assign(game, dto);
    return this.repo.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.repo.remove(game);
  }
}
