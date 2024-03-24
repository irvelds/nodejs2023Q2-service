import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import { TrackDto } from './dto/track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async create(dto: TrackDto) {
    return await this.trackRepository.save(dto);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const findTrack = await this.trackRepository.findOneBy({ id });
    if (!findTrack) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findTrack;
  }

  async update(id: string, dto: TrackDto) {
    const findTrack = await this.findOne(id);
    return this.trackRepository.save({ ...findTrack, ...dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.trackRepository.delete(id);
  }

  async findTrackById(id: string) {
    return await this.trackRepository.findOneBy({ id });
  }
}
