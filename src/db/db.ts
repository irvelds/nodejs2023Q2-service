import { IAlbum } from 'src/api/albums/interface/album.interface';
import { IArtist } from 'src/api/artists/interface/artist.interface';
import { ITrack } from 'src/api/tracks/interface/track.interface';
import { User } from 'src/api/users/entities/user.entity';
import { IDatabase, IFavorites } from 'src/models/interfaces';

export class Db {
  // users: User[] = [];
  artists: IArtist[] = [];
  tracks: ITrack[] = [];
  albums: IAlbum[] = [];
  favorites: IFavorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
