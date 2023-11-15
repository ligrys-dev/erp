import { Role } from 'src/types';

export interface UserEntity {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  pwdHash: string;
  role: Role;
}

export type SaveUserEntity = Omit<UserEntity, 'pwdHash'>;
