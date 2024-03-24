import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// import { Db } from 'src/db/db';

import { message } from 'src/constants/message';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}
  async create(dto: AlbumDto) {
    return await this.albumsRepository.save(dto);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const findAlbum = await this.albumsRepository.findOneBy({ id });
    if (!findAlbum) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findAlbum;
  }

  async update(id: string, dto: AlbumDto) {
    const findAlbum = await this.findOne(id);
    return this.albumsRepository.save({ ...findAlbum, ...dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumsRepository.delete(id);
  }

  async findAlbumById(id: string) {
    return await this.albumsRepository.findOneBy({ id });
  }
}
