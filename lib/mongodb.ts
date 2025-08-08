// lib/mongodb.ts

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Глобальна змінна для кешування підключення в режимі розробки
 */
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
let cached: Cached = global.mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // додавай інші опції, якщо потрібно
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
