import { IAlbum } from 'src/api/albums/interface/album.interface';
import { IArtist } from 'src/api/artists/interface/artist.interface';
import { ITrack } from 'src/api/tracks/interface/track.interface';
import { IFavorite } from '../interface/favorite.interface';

export class Favorite implements IFavorite {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
