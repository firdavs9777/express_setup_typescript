// import mongoose, {Schema, Document} from "mongoose";
// interface Iuser extends Document {
//   name: string;
//   email: string;
// }
// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true }
// });
// const User = mongoose.model<Iuser>('User', UserSchema);
// export default User;

import mongoose, { Document, Schema } from "mongoose";
import Review from "./review";

interface Iproduct extends Document {
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: object;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

const ProductSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [Review],
  rating: { type: Number, required: true },
  numReviews: {
    type: Number, required:true, default:0
  },
  price: {
    type: Number, required:true, default:0
  },
  countInStock: {
    type: Number, required:true, default:0
  },
}, {
  timestamps: true
});
const Product = mongoose.model<Iproduct>('Product', ProductSchema);
export default Product;