import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { login: dto.login },
    });
    if (user) {
      throw new HttpException(message.existUser, HttpStatus.CONFLICT);
    }
    return await this.usersRepository.save(dto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (user.password !== dto.oldPassword) {
      throw new HttpException(
        message.incorrectOldPasswordMessage,
        HttpStatus.FORBIDDEN,
      );
    }
    //await this.usersRepository.update(id, { password: dto.newPassword });
    user.password = dto.newPassword;
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.usersRepository.remove(user);
  }
}
