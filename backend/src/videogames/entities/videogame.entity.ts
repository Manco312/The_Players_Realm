import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Studio } from '../../studios/entities/studio.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('videogames')
export class Videogame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  online: boolean;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  totalSales: number;

  @Column()
  releaseYear: number;

  @Column({ nullable: true })
  director: string;

  @Column()
  studioId: number;

  @ManyToOne(() => Studio, (studio) => studio.videogames)
  @JoinColumn({ name: 'studioId' })
  studio: Studio;

  @OneToMany(() => Review, (review) => review.videogame)
  reviews: Review[];
}
