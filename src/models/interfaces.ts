import { Album } from 'src/api/albums/entities/album.entity';
import { Artist } from 'src/api/artists/entities/artist.entity';
import { Track } from 'src/api/tracks/entities/track.entity';
import { User } from 'src/api/users/entities/user.entity';

export interface IDatabase {
  users: User[];
  artists: Artist[],
  tracks: Track[],
  albums: Album[]
}
