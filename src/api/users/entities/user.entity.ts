import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ColumnOptions,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

const transformData = {
  transformer: {
    from: (value: string): number => new Date(value).getTime(),
    to: (value: string): string => value,
  },
} as ColumnOptions;


@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn(transformData)
  createdAt: number;

  @UpdateDateColumn(transformData)
  updatedAt: number;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}
