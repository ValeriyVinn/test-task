import mongoose, { Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
