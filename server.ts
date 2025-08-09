// import express, { Application } from 'express';
// import dotenv from 'dotenv';
// import connectDB from './db.ts';
// import authRoutes from './src/routes/auth.routes.ts';
// import productRoutes from './src/routes/product.routes.ts';
// // import User from './models/user.model';
// // import Product from './models/product.model';

// dotenv.config();
// connectDB();

// const app: Application = express();
// app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api', productRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// app.listen(5000, () => {
//   console.log('🚀 Server running on port 5000');
// });


// import expressPkg from 'express';
// const express = 'default' in expressPkg ? (expressPkg as any).default : expressPkg;

// import expressPkg from 'express';

// const expressModule = expressPkg as typeof import('express') & { default?: typeof import('express') };

// const express = 'default' in expressModule ? expressModule.default! : expressModule;

import express from 'express';
// далі просто використовуйте express

import type { Application, Request, Response } from 'express';

import dotenv from 'dotenv';
import connectDB from './db.ts';
import authRoutes from './src/routes/auth.routes.ts';
import productRoutes from './src/routes/product.routes.ts';

dotenv.config();
connectDB();

const app: Application = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
