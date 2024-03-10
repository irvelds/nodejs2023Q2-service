import { ArtistDto } from '../dto/artist.dto';
import { IArtist } from '../interface/artist.interface';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(dto: ArtistDto) {
    Object.assign(this, dto);
  }
}
