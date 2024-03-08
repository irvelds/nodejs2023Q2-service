import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ArtistsModule } from './api/artists/artists.module';
import { TracksModule } from './api/tracks/tracks.module';
import { AlbumsModule } from './api/albums/albums.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
