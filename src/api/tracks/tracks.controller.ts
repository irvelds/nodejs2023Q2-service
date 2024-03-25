import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrackDto } from './dto/track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() dto: TrackDto) {
    return this.tracksService.create(dto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: TrackDto) {
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
