import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';

import { StatusCodes } from 'http-status-codes';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() dto: ArtistDto): Artist {
    return this.artistsService.create(dto);
  }

  @Get()
  findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ArtistDto,
  ): Artist {
    return this.artistsService.update(id, dto);
  }


  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
