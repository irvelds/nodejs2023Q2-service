import { IUpdatePasswordDto } from '../interface.ts/user.interface';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
