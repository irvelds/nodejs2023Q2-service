import { IUpdatePasswordDto } from '../interface/user.interface';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
