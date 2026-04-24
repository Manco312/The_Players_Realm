import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from './entities/studio.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Injectable()
export class StudiosService {
  constructor(@InjectRepository(Studio) private readonly repo: Repository<Studio>) {}

  findAll(): Promise<Studio[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Studio> {
    const studio = await this.repo.findOne({ where: { id } });
    if (!studio) throw new NotFoundException(`Studio #${id} not found`);
    return studio;
  }

  create(dto: CreateStudioDto): Promise<Studio> {
    const studio = this.repo.create(dto);
    return this.repo.save(studio);
  }

  async update(id: number, dto: UpdateStudioDto): Promise<Studio> {
    const studio = await this.findOne(id);
    Object.assign(studio, dto);
    return this.repo.save(studio);
  }

  async remove(id: number): Promise<void> {
    const studio = await this.findOne(id);
    await this.repo.remove(studio);
  }
}
