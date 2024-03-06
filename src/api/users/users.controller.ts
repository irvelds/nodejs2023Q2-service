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
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() dto: CreateUserDto): User {
    //return new User(this.usersService.create(dto));
    return plainToInstance(User, this.usersService.create(dto));
  }

  @Get()
  findAll(): User[] {
    return plainToInstance(User, this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    return plainToInstance(User, this.usersService.findOne(id));
  }

  @HttpCode(StatusCodes.OK)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ): User {
    return plainToInstance(User, this.usersService.update(id, dto));
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): User[] {
    return plainToInstance(User, this.usersService.remove(id));
  }
}
