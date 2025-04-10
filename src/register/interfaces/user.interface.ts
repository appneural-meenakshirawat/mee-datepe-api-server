import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  findOneByEmail(email: string): Promise<IUser | null>;
  getUserById(id: string): Promise<IUser | null>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  dob: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model<IUser>('Me', userSchema);

export default User;
