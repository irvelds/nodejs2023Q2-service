import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { Track } from './entities/track.entity';
@Injectable()
export class TracksService {
  constructor(private db: Db) {}
  create(dto: TrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  findAll(): Track[] {
    return this.db.tracks;
  }

  // findById(id: string): Track | null {
  //   const findTrack = this.db.tracks.find((track) => track.id === id);
  //   return findTrack ?? null;
  // }

  findOne(id: string): Track {
    const findTrack = this.findTrackById(id);
    if (findTrack) {
      return findTrack;
    }
  }

  update(id: string, dto: TrackDto): Track {
    const findTrack = this.findTrackById(id);
    if (findTrack) {
      const updateTrack = {
        ...findTrack,
        ...dto,
      };

      this.db.tracks = this.db.tracks.map((track) => {
        if (track.id === id) {
          return updateTrack;
        }
        return track;
      });
      return updateTrack;
    }
  }

  remove(id: string) {
    const findTrack = this.findTrackById(id);
    if (findTrack) {
      this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
      this.db.favorites.tracks = this.db.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }
  }

  findTrackById(id: string) {
    const findTrack = this.db.tracks.find((track) => track.id === id);
    if (!findTrack) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findTrack ?? null;
  }
}
