import { Exclude } from 'class-transformer';
import { ICreateUserDtoType } from '../interface.ts/user.interface';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUserDtoType {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;
}
