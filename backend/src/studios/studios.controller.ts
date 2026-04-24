import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studiosService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post()
  create(@Body() dto: CreateStudioDto) {
    return this.studiosService.create(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudioDto) {
    return this.studiosService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studiosService.remove(id);
  }
}
