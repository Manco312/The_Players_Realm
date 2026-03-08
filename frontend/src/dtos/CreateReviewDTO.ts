// Made by: Santiago Manco
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export type CreateReviewDTO = Omit<ReviewInterface, 'id'>;
