import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document { 
  user: object;
  name: string;
  rating: number;
  comment: string;
}
const ReviewSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, {timestamps: true})

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
export {ReviewSchema};