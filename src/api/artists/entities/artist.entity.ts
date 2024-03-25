import { Album } from 'src/api/albums/entities/album.entity';

import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Track } from 'src/api/tracks/entities/track.entity';
import { Favorites } from 'src/api/favorites/entities/favorite.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @ManyToOne(() => Favorites, (favorites) => favorites.artists)
  favorites: Favorites;

  // constructor(dto: ArtistDto) {
  //   Object.assign(this, dto);
  // }
}
