import type { Request as ReqType, Response as ResType, NextFunction as NextFnType } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Тип для користувача, що зберігається у req.user
interface JwtPayload {
  id: string;
  email?: string;
}

// Розширений тип запиту з user
export interface AuthRequest extends ReqType {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: ResType,
  next: NextFnType
) => {
  // Беремо токен з cookie
  const token = req.cookies.token;
  console.log("Cookie token:", token);

  if (!token) {
    return res.status(401).json({ message: 'Немає токена, авторизація відхилена' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Невірний або прострочений токен' });
  }
};
