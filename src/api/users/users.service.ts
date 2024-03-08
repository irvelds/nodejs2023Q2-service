import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Db } from 'src/db/db';
import { message } from 'src/constants/message';
import {
  v4 as uuidv4
} from 'uuid';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(private db: Db) { }
  create(dto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return this.db.users;
  }

  // findById(id: string): User {
  //   const findUser = this.db.users.find((user) => user.id === id);
  //   return findUser ?? null;
  // }

  findOne(id: string): User {
    const findUser = this.findUserById(id);
    if (findUser) {
      return findUser;
    } 
  }

  update(id: string, dto: UpdatePasswordDto): User {
    const findUser = this.findUserById(id);
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

      this.db.users = this.db.users.map((user) => {
        if (user.id === id) {
          return updateUser;
        }
        return user;
      });
      return updateUser;
    }
   
  }

  remove(id: string) {
    const findUser = this.findUserById(id);
    if (findUser) {
      this.db.users = this.db.users.filter((user) => user.id !== id);
    } 
   }

   
  findUserById(id: string){
    const findUser = this.db.users.find((user) => user.id === id);
    if (!findUser) {
      throw new HttpException(message.notFoundMessage, HttpStatus.NOT_FOUND);
    }
    return findUser ?? null;
  }

}


