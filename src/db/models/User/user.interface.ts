export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: string;
  name: string;
  role: USER_ROLE;
  password: string;
}

export type ICreateUserAttributes = Pick<IUser, 'name' | 'password'>;
