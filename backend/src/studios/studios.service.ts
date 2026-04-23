import { Injectable, NotFoundException } from '@nestjs/common';
import { Studio } from './entities/studio.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

@Injectable()
export class StudiosService {
  private studios: Studio[] = [];
  private nextId = 1;

  findAll(): Studio[] {
    return this.studios;
  }

  findOne(id: number): Studio {
    const studio = this.studios.find((s) => s.id === id);
    if (!studio) throw new NotFoundException(`Studio #${id} not found`);
    return studio;
  }

  create(createStudioDto: CreateStudioDto): Studio {
    const studio: Studio = { id: this.nextId++, ...createStudioDto };
    this.studios.push(studio);
    return studio;
  }

  update(id: number, updateStudioDto: UpdateStudioDto): Studio {
    const studio = this.findOne(id);
    Object.assign(studio, updateStudioDto);
    return studio;
  }

  remove(id: number): void {
    const index = this.studios.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException(`Studio #${id} not found`);
    this.studios.splice(index, 1);
  }
}
