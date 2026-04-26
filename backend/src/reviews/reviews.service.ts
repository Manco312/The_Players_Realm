// Author: Luciana Hoyos

// External Imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

// Internal Imports
import { CreateReviewDto } from './dto/create-review.dto';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly repo: Repository<Review>,
  ) {}
  findAll(): Promise<Review[]> {
    return this.repo.find();
  }

  findByVideogame(videogameId: number): Promise<Review[]> {
    return this.repo.find({ where: { videogameId } });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  create(dto: CreateReviewDto, userId: number): Promise<Review> {
    const review = this.repo.create({ ...dto, userId });
    return this.repo.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.repo.remove(review);
  }
}
