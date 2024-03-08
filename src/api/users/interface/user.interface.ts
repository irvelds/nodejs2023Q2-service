export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export type ICreateUserDtoType = Pick<IUser, 'login' | 'password'>;

export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
