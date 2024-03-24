import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
// import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import { IFavorites } from './interface/favorite.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './entities/favorite.entity';

const isFavorites: IFavorites = {
  artists: true,
  albums: true,
  tracks: true,
};

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
    private readonly trackService: TracksService,
  ) {}

  async findByEntities(entities: IFavorites = isFavorites) {
    const favorites = await this.favoritesRepository.find({
      relations: entities,
    });

    if (favorites.length === 0) {
      const favorites = new Favorites();
      await this.favoritesRepository.save(favorites);
      return (await this.favoritesRepository.find({ relations: entities }))[0];
    }

    return favorites[0];
  }

  async findAll() {
    const { albums, artists, tracks } = await this.findByEntities();
    return { albums, artists, tracks };
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumService.findAlbumById(id);

    if (!album) {
      throw new HttpException(
        message.notFoundMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByEntities({ albums: true });
    favorites.albums.push(album);
    return this.favoritesRepository.save(favorites);
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.albumService.findAlbumById(id);

    if (!album) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }

    const favorites = await this.findByEntities({ albums: true });
    favorites.albums = favorites.albums.filter((val) => val.id !== id);
    return this.favoritesRepository.save(favorites);
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistService.findArtistById(id);

    if (!artist) {
      throw new HttpException(
        message.notFoundMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByEntities({ artists: true });
    favorites.artists.push(artist);
    return this.favoritesRepository.save(favorites);
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.artistService.findArtistById(id);

    if (!artist) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }

    const favorites = await this.findByEntities({ artists: true });

    favorites.artists = favorites.artists.filter((val) => val.id !== id);

    return this.favoritesRepository.save(favorites);
  }

  async addTrackToFavorites(id: string) {
    const track = await this.trackService.findTrackById(id);

    if (!track) {
      throw new HttpException(
        message.notFoundMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByEntities({ tracks: true });
    favorites.tracks.push(track);
    return await this.favoritesRepository.save(favorites);
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.trackService.findTrackById(id);

    if (!track) {
      throw new HttpException(
        message.notFoundMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByEntities({ tracks: true });
    favorites.tracks = favorites.tracks.filter((val) => val.id !== id);
    return this.favoritesRepository.save(favorites);
  }
}
