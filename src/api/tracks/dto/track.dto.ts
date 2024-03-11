import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';
import { ITrack } from '../interface/track.interface';

export class TrackDto implements Omit<ITrack, 'id'> {
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
