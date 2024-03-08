import { Exclude } from 'class-transformer';
import { IUser } from '../interface/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export class User implements IUser{
  id: string;
  login: string;
  @Exclude()
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
