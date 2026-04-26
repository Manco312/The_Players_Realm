// Author: Luciana Hoyos

// External Imports
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

// Internal Imports
import { Videogame } from '../../videogames/entities/videogame.entity';
@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column()
  rating: string;

  @Column()
  userId: number;

  @Column()
  videogameId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Videogame, (videogame) => videogame.reviews)
  @JoinColumn({ name: 'videogameId' })
  videogame: Videogame;
}
