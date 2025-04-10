import mongoose from 'mongoose';

export interface IUserPhoto extends mongoose.Document {
  userId: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
}

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User-Registration',
    require: true,
    unique: true,
  },
  images: [String],
  interest: [String],
  bio: String,
});

export default UserProfileSchema;
