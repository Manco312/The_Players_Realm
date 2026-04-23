import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  private reviews: Review[] = [];
  private nextId = 1;

  findAll(): Review[] {
    return this.reviews;
  }

  findOne(id: number): Review {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  create(createReviewDto: CreateReviewDto): Review {
    const review: Review = { id: this.nextId++, ...createReviewDto };
    this.reviews.push(review);
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto): Review {
    const review = this.findOne(id);
    Object.assign(review, updateReviewDto);
    return review;
  }

  remove(id: number): void {
    const index = this.reviews.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException(`Review #${id} not found`);
    this.reviews.splice(index, 1);
  }
}
