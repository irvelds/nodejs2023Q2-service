import { IsOptional } from 'class-validator';
import { Artist } from 'src/api/artists/entities/artist.entity';
import { Favorites } from 'src/api/favorites/entities/favorite.entity';
import { Track } from 'src/api/tracks/entities/track.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Entity,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  // @Column({ type: 'uuid', nullable: true })
  // artistId: string | null;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Favorites, (favorites) => favorites.albums)
  favorites: Favorites;
}
