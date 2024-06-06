import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';


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
    required: true,
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
}, { timestamps: true });

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
};
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string,salt);
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;