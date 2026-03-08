import type { VideogameInterface } from '@/interfaces/VideogameInterface';

export type CreateVideogameDTO = Omit<VideogameInterface, 'id'>;
