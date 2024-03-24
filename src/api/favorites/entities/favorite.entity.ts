import { Exclude } from 'class-transformer';

import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Artist } from 'src/api/artists/entities/artist.entity';
import { Album } from 'src/api/albums/entities/album.entity';
import { Track } from 'src/api/tracks/entities/track.entity';

@Entity({ name: 'Favorites' })
export class Favorites {
  @PrimaryColumn({ default: 1 })
  @Exclude()
  id: number;

  @OneToMany(() => Album, (album) => album.favorites)
  albums: Album[];

  @OneToMany(() => Artist, (artist) => artist.favorites)
  artists: Artist[];

  @OneToMany(() => Track, (track) => track.favorites)
  tracks: Track[];
}
