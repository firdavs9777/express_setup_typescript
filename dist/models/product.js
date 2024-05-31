"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const review_1 = __importDefault(require("./review"));
const ProductSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [review_1.default],
    rating: { type: Number, required: true },
    numReviews: {
        type: Number, required: true, default: 0
    },
    price: {
        type: Number, required: true, default: 0
    },
    countInStock: {
        type: Number, required: true, default: 0
    },
}, {
    timestamps: true
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
