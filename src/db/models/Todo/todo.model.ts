import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../../db-connect';
import { ICreateTodoAttributes, ITodo } from './todo.interface';

interface ITodoModel extends ITodo, Model<ITodoModel, ICreateTodoAttributes> {}

export const Todo = sequelize.define<ITodoModel, ITodo>('todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  text: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  updated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
