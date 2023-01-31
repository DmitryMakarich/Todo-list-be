import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../../db-connect';
import { ICreateUserAttributes, IUser, USER_ROLE } from './user.interface';

interface IUserModel extends IUser, Model<IUserModel, ICreateUserAttributes> {}

export const User = sequelize.define<IUserModel, IUser>('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(USER_ROLE)),
    defaultValue: USER_ROLE.USER,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
});
