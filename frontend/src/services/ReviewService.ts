// Made by: Santiago Manco

// External Imports
import axiosInstance from '@/api/axiosInstance';

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export class ReviewService {
  static async getReviews(): Promise<ReviewInterface[]> {
    const { data: reviews } = await axiosInstance.get<ReviewInterface[]>('/api/reviews');
    return reviews;
  }

  static async getReviewsByVideogameId(videogameId: number): Promise<ReviewInterface[]> {
    const { data: reviews } = await axiosInstance.get<ReviewInterface[]>(
      `/api/reviews?videogameId=${videogameId}`,
    );
    return reviews;
  }

  static async createReview(review: CreateReviewDTO): Promise<ReviewInterface> {
    const { data: createdReview } = await axiosInstance.post<ReviewInterface>('/api/reviews', {
      comment: review.comment,
      rating: review.rating,
      videogameId: review.videogameId,
    });
    return createdReview;
  }

  static getRatingDistribution(reviews: ReviewInterface[]): ChartData {
    const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      const rating = Number(review.rating);
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    return {
      labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
      datasets: [
        {
          label: 'Rating Distribution',
          data: Object.values(ratingCounts),
          backgroundColor: '#5CE1E6',
          borderColor: '#030027',
          borderWidth: 1,
        },
      ],
    };
  }
}
