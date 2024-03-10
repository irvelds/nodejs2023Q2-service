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
  create(@Body() dto: CreateUserDto): User {
    return plainToInstance(User, this.usersService.create(dto));
  }

  @Get()
  findAll() {
    return plainToInstance(User, this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    return plainToInstance(User, this.usersService.findOne(id));
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ): User {
    return plainToInstance(User, this.usersService.update(id, dto));
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return plainToInstance(User, this.usersService.remove(id));
  }
}
