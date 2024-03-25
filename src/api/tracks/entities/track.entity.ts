import { IsOptional } from 'class-validator';
import { Album } from 'src/api/albums/entities/album.entity';
import { Artist } from 'src/api/artists/entities/artist.entity';
import { Favorites } from 'src/api/favorites/entities/favorite.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null;

  @IsOptional()
  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Favorites, (favorites) => favorites.tracks)
  favorites: Favorites;
}
