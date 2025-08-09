// import mongoose, { Document, Model } from 'mongoose';

// export interface IProduct extends Document {
//   name: string;
//   price: number;
//   description?: string;
//   inStock: boolean;
// }

// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     description: {
//       type: String
//     },
//     inStock: {
//       type: Boolean,
//       default: true
//     }
//   },
//   { timestamps: true }
// );

// const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
// export default Product;

import mongoose, { Document, Model, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
  user: Types.ObjectId;  // додано поле user
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
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
export default Product;
