import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI не задано у змінних оточення");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Успішне підключення до MongoDB");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Помилка підключення:", error);
    process.exit(1);
  }
}

main();
