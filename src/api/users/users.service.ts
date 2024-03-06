import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { db } from 'src/db/db';
import { message } from 'src/constants/message';
import {
  v4 as uuidv4,
  validate as uuidValid,
  version as uuidVersion,
} from 'uuid';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  create(dto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return db.users;
  }

  findById(id: string): User | null {
    const findUser = db.users.find((user) => user.id === id);
    return findUser ?? null;
  }

  findOne(id: string): User {
    // if (!(uuidValid(id) && uuidVersion(id) === 4)) {
    //   throw new HttpException(message.notFoundMessage, HttpStatus.BAD_REQUEST);
    // }
    const findUser = this.findById(id);
    if (findUser) {
      return findUser;
    }
    throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
  }

  update(id: string, dto: UpdatePasswordDto): User {
    const findUser = this.findById(id);
    if (findUser) {
      if (findUser.password !== dto.oldPassword) {
        throw new HttpException(
          message.incorrectOldPassword,
          HttpStatus.FORBIDDEN,
        );
      }

      const updateUser = {
        ...findUser,
        password: dto.newPassword,
        version: findUser.version + 1,
        updatedAt: Date.now(),
      };

      db.users = db.users.map((user) => {
        if (user.id === id) {
          return updateUser;
        }
        return user;
      });
      return updateUser;
    }
    throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
  }

  remove(id: string): User[] {
    const findUser = this.findById(id);

    if (findUser) {
      db.users = db.users.filter((user) => user.id !== id);
      return db.users;
    }
    throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
  }
}
