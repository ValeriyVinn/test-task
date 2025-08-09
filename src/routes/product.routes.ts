// // export default router;
// import { Router, Request, Response } from 'express';
// import Product from '../../models/product.model.ts';
// import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.ts';

// const router = Router();

// /**
//  * @route POST /api/products
//  * @desc Додає новий продукт (тільки для авторизованих)
//  */
// router.post('/products', authMiddleware, async (req: AuthRequest, res: Response) => {
//   try {
//     const { name, price, description } = req.body;

//     if (!name || !price) {
//       return res.status(400).json({ message: 'Назва і ціна обовʼязкові' });
//     }

//     if (!req.user) {
//       return res.status(401).json({ message: 'Користувач не авторизований' });
//     }

//     const product = new Product({
//       name,
//       price,
//       description,
//       user: req.user.id,
//     });

//     await product.save();
//     return res.status(201).json(product);
//   } catch (error: unknown) {
//     console.error(error);
//     return res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// /**
//  * @route GET /api/products
//  * @desc Отримати список продуктів (доступно всім)
//  */
// router.get('/products', async (_req: Request, res: Response) => {
//   try {
//     const products = await Product.find().populate('user', 'name email');
//     return res.json(products);
//   } catch (error: unknown) {
//     console.error(error);
//     return res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// export default router;


import expressPkg from 'express';
const { Router } = expressPkg;
import type { Request, Response } from 'express';

import Product from '../../models/product.model.ts';
// import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import type { AuthRequest } from '../middleware/authMiddleware.ts';


const router = Router();

/**
 * @route POST /api/products
 * @desc Додає новий продукт (тільки для авторизованих)
 */
router.post('/products', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Назва і ціна обовʼязкові' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Користувач не авторизований' });
    }

    const product = new Product({
      name,
      price,
      description,
      user: req.user.id,
    });

    await product.save();
    return res.status(201).json(product);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * @route GET /api/products
 * @desc Отримати список продуктів (доступно всім)
 */
router.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    return res.json(products);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
