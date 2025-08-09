import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';
const JWT_EXPIRES_IN = '7d'; // наприклад, 7 днів

interface TokenPayload {
  id: string;
  email: string;
}

// Хешування пароля
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Перевірка пароля
export const comparePasswords = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};


export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Перевірка/розшифрування JWT токена
export const verifyToken = (token: string): string | jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

