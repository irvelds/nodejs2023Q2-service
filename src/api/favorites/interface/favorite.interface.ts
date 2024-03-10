import { IAlbum } from 'src/api/albums/interface/album.interface';
import { IArtist } from 'src/api/artists/interface/artist.interface';
import { ITrack } from 'src/api/tracks/interface/track.interface';

export interface IFavorite {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
export type IFavoritePath = 'tracks' | 'albums' | 'artists';
export type IFavoriteEntity = IArtist | IAlbum | ITrack;
