
import { IAlbum } from '../interface/album.interface';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
export class AlbumDto implements Omit<IAlbum, 'id'> {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    year: number;

    @IsOptional()
    @IsUUID()
    artistId: string | null;


}
