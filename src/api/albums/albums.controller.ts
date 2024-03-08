import { Controller, Get, Post, Body,  Param, Delete, HttpCode, ParseUUIDPipe, Put } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';

import { plainToInstance } from 'class-transformer';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';


@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() dto: AlbumDto): Album {
    return plainToInstance(Album, this.albumsService.create(dto));
  }

  @Get()
  findAll(): Album[] {
    return plainToInstance(Album, this.albumsService.findAll());
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Album {
    return plainToInstance(Album, this.albumsService.findOne(id));
  }

  @HttpCode(StatusCodes.OK)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AlbumDto,
  ): Album {
    return plainToInstance(Album, this.albumsService.update(id, dto));
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return plainToInstance(Album, this.albumsService.remove(id));
  }
}
