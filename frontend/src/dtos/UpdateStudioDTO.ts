// Made by: Santiago Manco
import type { StudioInterface } from '@/interfaces/StudioInterface';

export type UpdateStudioDTO = Partial<Omit<StudioInterface, 'id'>>;
