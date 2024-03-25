import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistDto } from './dto/artist.dto';
import { message } from 'src/constants/message';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async create(dto: ArtistDto) {
    return await this.artistsRepository.save(dto);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    const findArtist = await this.artistsRepository.findOneBy({ id });
    if (!findArtist) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findArtist;
  }

  async update(id: string, updateArtistDto: ArtistDto) {
    const findArtist = await this.findOne(id);
    return await this.artistsRepository.save({
      ...findArtist,
      ...updateArtistDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.artistsRepository.delete(id);
  }

  async findArtistById(id: string) {
    return await this.artistsRepository.findOneBy({ id });
  }
}
