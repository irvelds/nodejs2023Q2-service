import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Db } from 'src/db/db';

import { message } from 'src/constants/message';
import {
  v4 as uuidv4
} from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private db: Db) { }
  create(dto: AlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  findAll(): Album[] {
    return this.db.albums;
  }

  // findById(id: string): Album | null {
  //   const findAlbum = this.db.albums.find((album) => album.id === id);
  //   return findAlbum ?? null;
  // }

  findOne(id: string): Album {
    const findAlbum = this.findAlbumtById(id);
    if (findAlbum) {
      return findAlbum;
    }
   }

  update(id: string, dto: AlbumDto): Album {
    const findAlbum = this.findAlbumtById(id);
    if (findAlbum) {
      const updateAlbum = {
        ...findAlbum,
        ...dto,
      };

      this.db.albums = this.db.albums.map(album => {
        if (album.id === id) {
          return updateAlbum;
        }
        return album;
      });
      return updateAlbum;
    }
   }

  remove(id: string) {
    const findAlbum = this.findAlbumtById(id);

    if (findAlbum) {
      this.db.albums = this.db.albums.filter((album) => album.id !== id);
      this.db.tracks = this.removeAlbumFromTracks(id);
    }
  }
  removeAlbumFromTracks(id: string) {
    return this.db.tracks.map((track) => {
      if (track.albumId === id) {
        return { ...track, albumId: null }
      }
      else return track
    })
  }

  findAlbumtById(id: string){
    const findAlbum = this.db.albums.find((album) => album.id === id);
    if (!findAlbum) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findAlbum ?? null;
  }
}
