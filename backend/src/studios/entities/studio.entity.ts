import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Videogame } from '../../videogames/entities/videogame.entity';

@Entity('studios')
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  foundedYear: number;

  @OneToMany(() => Videogame, (videogame) => videogame.studio)
  videogames: Videogame[];
}
