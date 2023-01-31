import jwt from 'jsonwebtoken';
import { USER_ROLE } from '../db/models/User/user.interface';

const privateKey = process.env.JWT_SECRET as string;

class JwtService {
  sign(id: string, role: USER_ROLE, data?: any, expiresIn = '24d'): string {
    return jwt.sign({ id, role, ...data }, privateKey, { expiresIn });
  }

  verify(token: string): IJwtDecoded {
    return jwt.verify(token, privateKey) as IJwtDecoded;
  }
}

export const jwtService = new JwtService();

export interface IJwtDecoded {
  id: number;
  roles: string[];
  [k: string]: any;
}
