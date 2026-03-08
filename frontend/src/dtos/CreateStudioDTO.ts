// Made by: Santiago Manco
import type { StudioInterface } from '@/interfaces/StudioInterface';

export type CreateStudioDTO = Omit<StudioInterface, 'id'>;
