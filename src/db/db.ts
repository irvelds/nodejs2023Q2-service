import { IAlbum } from 'src/api/albums/interface/album.interface';
import { IArtist } from 'src/api/artists/interface/artist.interface';
import { ITrack } from 'src/api/tracks/interface/track.interface';
import { IUser } from 'src/api/users/interface/user.interface';
import { IDatabase, IFavorites } from 'src/models/interfaces';

export class Db implements IDatabase {
  users: IUser[] = [];
  artists: IArtist[] = [];
  tracks: ITrack[] = [];
  albums: IAlbum[] = [];
  favorites: IFavorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
