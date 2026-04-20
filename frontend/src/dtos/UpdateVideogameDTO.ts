// Made by: Santiago Manco
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export type UpdateVideogameDTO = Partial<Omit<VideogameInterface, 'id'>>;
