import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import { IFavoriteEntity, IFavoritePath } from './interface/favorite.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private db: Db,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  getPath(type: IFavoritePath) {
    switch (type) {
      case 'albums':
        return this.albumsService;
      case 'artists':
        return this.artistsService;
      case 'tracks':
        return this.tracksService;
    }
  }

  findAll() {
    const foundFavorites = {};
    const favorites = Object.entries(this.db.favorites);
    favorites.forEach((key) => {
      foundFavorites[key[0]] = this.db.favorites[key[0]].map((el: string) =>
        this.getPath(key[0] as IFavoritePath).findOne(el),
      );
    });
    return foundFavorites;
  }

  addAlbumToFavorites(id: string) {
    this.addEntity(id, 'albums');
  }

  removeAlbumFromFavorites(id: string) {
    this.removeEntity(id, 'albums');
  }

  addArtistToFavorites(id: string) {
    this.addEntity(id, 'artists');
  }

  removeArtistFromFavorites(id: string) {
    this.removeEntity(id, 'artists');
  }

  addTrackToFavorites(id: string) {
    this.addEntity(id, 'tracks');
  }

  removeTrackFromFavorites(id: string) {
    this.removeEntity(id, 'tracks');
  }

  removeEntity(id: string, entities: string) {
    const findEntity = this.db[entities].find(
      (e: IFavoriteEntity) => e.id === id,
    );

    if (!this.db.favorites[entities].includes(id)) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    if (findEntity) {
      this.db.favorites[entities] = this.db.favorites[entities].filter(
        (entityId: string) => entityId !== id,
      );
    } else {
      throw new HttpException(message.notFoundMessage, HttpStatus.BAD_REQUEST);
    }
  }

  addEntity(id: string, entities: string) {
    const findEntity = this.db[entities].find(
      (e: IFavoriteEntity) => e.id === id,
    );
    if (!findEntity) {
      throw new HttpException(
        message.notFoundMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (this.db.favorites[entities].includes(id)) {
      throw new HttpException(
        message.existInFavoritesMessage,
        HttpStatus.CONFLICT,
      );
    }

    this.db.favorites[entities].push(id);
    throw new HttpException(
      `${entities.slice(
        0,
        -1,
      )} whith id: ${id} successfully added to favorites`,
      HttpStatus.CREATED,
    );
  }
}
