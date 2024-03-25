import { IAlbum } from 'src/api/albums/interface/album.interface';
import { IArtist } from 'src/api/artists/interface/artist.interface';
import { ITrack } from 'src/api/tracks/interface/track.interface';

export interface IFavorites {
  artists?: boolean;
  albums?: boolean;
  tracks?: boolean;
}
export type IFavoritePath = 'tracks' | 'albums' | 'artists';
export type IFavoriteEntity = IArtist | IAlbum | ITrack;
