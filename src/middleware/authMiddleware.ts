// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// export interface AuthRequest extends Request {
//   user?: any;
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Немає токена, авторизація відхилена' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // зберігаємо користувача в req
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Невірний або прострочений токен' });
//   }
// };


// -----------------

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Тип для користувача, що зберігається у req.user
// interface JwtPayload {
//   id: string;
//   email: string;
// }

// export interface AuthRequest extends Request {
//   user?: JwtPayload;
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Немає токена, авторизація відхилена' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ message: 'Невірний або прострочений токен' });
//   }
// };
// -----------------------------
import type { Request as ReqType, Response as ResType, NextFunction as NextFnType } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Тип для користувача, що зберігається у req.user
interface JwtPayload {
  id: string;
  email: string;
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
  const token = req.header('Authorization')?.replace('Bearer ', '');
console.log("Auth header:", req.headers.authorization);

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
