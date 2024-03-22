import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateUserDto) {
    return plainToInstance(User, await this.usersService.create(dto));
  }

  @Get()
  async findAll() {
    return plainToInstance(User, await this.usersService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return plainToInstance(User, await this.usersService.findOne(id));
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return plainToInstance(User, await this.usersService.update(id, dto));
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return plainToInstance(User, await this.usersService.remove(id));
  }
}
