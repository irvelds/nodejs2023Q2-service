import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorite(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }
}
