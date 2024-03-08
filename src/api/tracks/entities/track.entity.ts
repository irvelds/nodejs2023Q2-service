import { ITrack } from "../interface/track.interface";


export class Track implements ITrack{
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;

    // constructor(dto: TrackDto) {
    //     Object.assign(this, dto);
    // }
}
