import { User } from 'src/api/users/entities/user.entity';

export interface IDatabase {
  users: User[];
}
