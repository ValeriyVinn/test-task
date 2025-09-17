// import express from 'express';
// import type { Application, Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './db.ts';
// import authRoutes from './src/routes/auth.routes.ts';
// import productRoutes from './src/routes/product.routes.ts';

// dotenv.config();
// connectDB();

// const app: Application = express();
// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:3000', // твій фронтенд
//   credentials: true,
// }));

// app.use('/api', authRoutes);
// app.use('/api', productRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.json({ message: 'User registered successfully'});
// });

// app.listen(5000, () => {
//   console.log('🚀 Server running on port 5000');
// });



import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db.ts';
import authRoutes from './src/routes/auth.routes.ts';
import productRoutes from './src/routes/product.routes.ts';

dotenv.config();
connectDB();

const app: Application = express();

// --- Middleware ---
app.use(express.json());
app.use(cookieParser()); // <- щоб читати cookie

// --- CORS ---
app.use(cors({
  origin: 'http://localhost:3000', // фронтенд
  credentials: true,               // дозволяємо cookie
}));

// --- Routes ---
app.use('/api', authRoutes);
app.use('/api', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// --- Start Server ---
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
