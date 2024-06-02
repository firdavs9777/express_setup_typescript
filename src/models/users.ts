import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document { 
  name: string,
  email: String,
  password: String,
  isAdmin: Boolean
}
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required:true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {timestamps: true})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;