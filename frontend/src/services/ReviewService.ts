// Made by: Santiago Manco

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getReviewsByVideogameId(videogameId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.videogameId === videogameId);
  }

  static createReview(review: Omit<ReviewInterface, 'id'>): void {
    const store = useReviewStore();
    const nextId =
      store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id), 0) + 1 : 1;
    store.reviews.push({
      id: nextId,
      ...review,
    });
  }

  static getRatingDistribution(reviews: ReviewInterface[]): ChartData {
    const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
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

  static getTotalReviews(reviews: ReviewInterface[]): number {
    return reviews.length;
  }
}
