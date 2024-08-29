import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;


export default function generateToken(userId: string) {

if (!secretKey) {
    throw new Error('JWT_SECRET_KEY não foi definida');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}