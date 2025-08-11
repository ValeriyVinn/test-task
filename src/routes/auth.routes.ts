import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import dotenv from "dotenv";

import expressPkg from "express";
const { Router } = expressPkg;
import type { Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: { id: string };
}

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// -------------------------
// 📌 Реєстрація
// -------------------------
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Всі поля обовʼязкові" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Користувач з таким email вже існує" });
//     }
//     console.log("Before hash:", password);

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hash:", hashedPassword);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(201).json({
//       token,
//       user: {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Помилка сервера" });
//   }
// });
// 📌 Реєстрація
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

    const newUser = new User({
      name,
      email,
      password, // ❌ не хешуємо вручну — хешує pre-save hook
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// -------------------------
// 📌 Логін
// -------------------------

router.post("/login", async (req: Request, res: Response) => {
  try {
    console.log("📩 Login request body:", req.body); // <--- Лог
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Missing fields");
      return res.status(400).json({ message: "Всі поля обовʼязкові" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("⚠️ No user found with email:", email);
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    console.log("Password from login form:", JSON.stringify(password));
    console.log("Password from DB:", JSON.stringify(user.password));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("⚠️ Invalid password for user:", email);
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// -------------------------
// 📌 Отримати поточного користувача
// -------------------------
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Користувач не авторизований" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Користувач не знайдений" });
    }

    res.json(user);
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// -------------------------
// 📌 Логаут
// -------------------------
router.post("/logout", (_req: Request, res: Response) => {
  res.json({ message: "Вихід успішний" });
});

export default router;
