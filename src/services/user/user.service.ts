import bcrypt from 'bcryptjs';
import { ICreateUserAttributes, IUser, User } from '../../db/models/User';
import { logger } from '../../helpers/logger.helper';
import { jwtService } from '../jwt.service';

class UserService {
  async login({ name, password }: ICreateUserAttributes): Promise<LoginResult> {
    try {
      const user = await User.findOne({
        where: { name },
      });
      if (!user) return { notFound: true };

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) return { inCorrectPassword: true };

      const { id, role, name: userName } = user;

      return { token: jwtService.sign(id, role, { name: userName }) };
    } catch (err: any) {
      logger.error('Error when login user', name, err);
      return { error: true };
    }
  }

  async register({ name, password }: ICreateUserAttributes): Promise<RegisterResult> {
    try {
      const user = await User.findOne({
        where: { name },
      });
      if (user) return { exists: true };

      const hashedPassword = await bcrypt.hash(password, 12);

      const {
        id,
        role,
        name: userName,
      } = await User.create({
        name,
        password: hashedPassword,
      });

      return { token: jwtService.sign(id, role, { name: userName }) };
    } catch (err: any) {
      logger.error('Error when login user', name, err);
      return { error: true };
    }
  }
}

export const userService = new UserService();

type RegisterResult = { token: string } | { error: true } | { exists: true };

type LoginResult =
  | { notFound: true }
  | { inCorrectPassword: true }
  | { token: string }
  | { error: true };
