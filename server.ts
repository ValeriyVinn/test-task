import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
// import User from './models/user.model';
// import Product from './models/product.model';

dotenv.config();
connectDB();

const app: Application = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
