import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeTrackFromFavorites(id);
  }
}
