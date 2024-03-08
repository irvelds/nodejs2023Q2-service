import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Db } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { message } from 'src/constants/message';
import {
  v4 as uuidv4
} from 'uuid';
@Injectable()
export class ArtistsService {
  constructor(private db: Db) { }
  create(dto: ArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll(): Artist[] {
    return this.db.artists;
  }

  // findById(id: string): Artist | null {
  //   const findArtist = this.db.artists.find((artist) => artist.id === id);
  //   return findArtist ?? null;
  // }

  findOne(id: string): Artist {
    const findArtist = this.findArtistById(id);
    if (findArtist) {
      return findArtist;
    }
    
  }

  update(id: string, dto: ArtistDto): Artist {
    const findArtist = this.findArtistById(id);
    if (findArtist) {
      const updateArtist = {
        ...findArtist,
        name: dto.name,
        grammy: dto.grammy,
      };

      this.db.artists = this.db.artists.map(artist => {
        if (artist.id === id) {
          return updateArtist;
        }
        return artist;
      });
      return updateArtist;
    }
   }

  remove(id: string) {
    const findArtist = this.findArtistById(id);

    if (findArtist) {
      this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
      this.db.tracks = this.removeArtistFromTracks(id);
      this.db.albums = this.removeArtistFromAlbums(id);
    }
    }

  removeArtistFromTracks(id: string) {
    return this.db.tracks.map((track) => {
      if (track.artistId === id) {
        return { ...track, artistId: null }
      }
      else return track
    })
  }

  removeArtistFromAlbums(id: string) {
    return this.db.albums.map((album) => {
      if (album.artistId === id) {
        return { ...album, artistId: null }
      }
      else return album
    })

  }

  findArtistById(id: string){
    const findArtist = this.db.artists.find((artist) => artist.id === id);
    if (!findArtist) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findArtist ?? null;
  }
}