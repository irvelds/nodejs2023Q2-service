import { AlbumDto } from "../dto/album.dto";
import { IAlbum } from "../interface/album.interface";
export class Album implements IAlbum{
    id: string;
    name: string;
    year: number;
    artistId: string | null;
    constructor(dto: AlbumDto) {
        Object.assign(this, dto);
    }
}
