import { Exclude } from 'class-transformer';
import { IUser } from '../interface.ts/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export class User implements IUser {
  id: string;
  login: string;
  @Exclude({ toPlainOnly: true })
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }

  // toJSON() {
  //   return classToPlain(this);
  // }
}
