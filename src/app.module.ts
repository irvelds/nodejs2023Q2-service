import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArtistsModule } from './api/artists/artists.module';
import { TracksModule } from './api/tracks/tracks.module';
import { AlbumsModule } from './api/albums/albums.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    DbModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
