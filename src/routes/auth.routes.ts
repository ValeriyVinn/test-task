// import { Router, Request, Response } from "express";
// import User from "../../models/user.model.ts";
// import { hashPassword, comparePasswords, generateToken } from "../../lib/auth.ts";

// const router = Router();

// /**
//  * @route POST /api/register
//  */
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Вкажіть всі поля" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Користувач з таким email вже існує" });
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(201).json({
//       message: "Реєстрація успішна",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Помилка сервера" });
//   }
// });

// /**
//  * @route POST /api/login
//  */
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Вкажіть email і пароль" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Невірний email або пароль" });
//     }

//     const isMatch = await comparePasswords(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Невірний email або пароль" });
//     }

//     // Explicitly cast user._id to string
//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(200).json({
//       message: "Вхід успішний",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Помилка сервера" });
//   }
// });

// export default router;
// --------------------------------------------------------

// import expressPkg from 'express';
// const { Router } = expressPkg;
// import type { Request, Response } from 'express';

// import User from '../../models/user.model.ts';
// import {  comparePasswords, generateToken } from '../../lib/auth.ts';

// const router = Router();




// /**
//  * @route POST /api/register
//  */
// router.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Вкажіть всі поля' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Користувач з таким email вже існує' });
//     }

    

//     const user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();

//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(201).json({
//       message: 'Реєстрація успішна',
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });



// /**
//  * @route POST /api/login
//  */
// router.post('/login', async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Вкажіть email і пароль' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Невірний email або пароль' });
//     }

//     const isMatch = await comparePasswords(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Невірний email або пароль' });
//     }

//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(200).json({
//       message: 'Вхід успішний',
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// export default router;

// ----------------------------------------------------------

// import expressPkg from 'express';
// const { Router } = expressPkg;
// import type { Request, Response } from 'express';

// import User from '../../models/user.model.ts';
// import { comparePasswords, generateToken } from '../../lib/auth.ts';

// const router = Router();

// /**
//  * @route POST /api/register
//  */
// router.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Вкажіть всі поля' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Користувач з таким email вже існує' });
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();

//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(201).json({
//       message: 'Реєстрація успішна',
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// /**
//  * @route POST /api/login
//  */
// router.post('/login', async (req: Request, res: Response) => {
//   try {
//     console.log('Login attempt body:', req.body);

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Вкажіть email і пароль' });
//     }

//     const user = await User.findOne({ email });
//     console.log('Found user:', user);

//     if (!user) {
//       return res.status(400).json({ message: 'Невірний email або пароль' });
//     }

//     const isMatch = await comparePasswords(password, user.password);
//     console.log('Password match result:', isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Невірний email або пароль' });
//     }

//     const token = generateToken({ id: String(user._id), email: user.email });

//     res.status(200).json({
//       message: 'Вхід успішний',
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// export default router;


// --------------------------------


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import dotenv from 'dotenv';


import expressPkg from 'express';
const { Router } = expressPkg;
import type { Request, Response } from 'express';

export interface AuthRequest extends Request {
  user?: { id: string };
}
dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// -------------------------
// 📌 Реєстрація
// -------------------------
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Всі поля обовʼязкові' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Користувач успішно створений' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// -------------------------
// 📌 Логін
// -------------------------
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Всі поля обовʼязкові' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Невірний email або пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Невірний email або пароль' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// -------------------------
// 📌 Отримати поточного користувача
// -------------------------
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Користувач не авторизований' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Користувач не знайдений' });
    }

    res.json(user);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// -------------------------
// 📌 Логаут
// -------------------------
router.post('/logout', (_req: Request, res: Response) => {
  // На бекенді JWT неможливо "видалити" без чорного списку
  // Просто повідомляємо клієнту, щоб він видалив токен
  res.json({ message: 'Вихід успішний' });
});

export default router;
