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

import expressPkg from 'express';
const { Router } = expressPkg;
import type { Request, Response } from 'express';

import User from '../../models/user.model.ts';
import { comparePasswords, generateToken } from '../../lib/auth.ts';

const router = Router();

/**
 * @route POST /api/register
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Вкажіть всі поля' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = generateToken({ id: String(user._id), email: user.email });

    res.status(201).json({
      message: 'Реєстрація успішна',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * @route POST /api/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    console.log('Login attempt body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Вкажіть email і пароль' });
    }

    const user = await User.findOne({ email });
    console.log('Found user:', user);

    if (!user) {
      return res.status(400).json({ message: 'Невірний email або пароль' });
    }

    const isMatch = await comparePasswords(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Невірний email або пароль' });
    }

    const token = generateToken({ id: String(user._id), email: user.email });

    res.status(200).json({
      message: 'Вхід успішний',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
