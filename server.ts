import express from 'express';
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
