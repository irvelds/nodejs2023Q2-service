import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IArtist } from '../interface/artist.interface';

export class ArtistDto implements Omit<IArtist, 'id'> {
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;
}
