import mongoose from 'mongoose';

export interface IUserPhoto extends mongoose.Document {
  userIds: string;
  images: [String];
  test: Boolean;
}

const UserPhotoSchema = new mongoose.Schema({
  userId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User-Registration',
    require: true,
    unique: true,
  },
  photo1: {
    type: String,
    require: true,
  },
  photo2: {
    type: String,
    require: true,
  },
  photo3: {
    type: String,
    require: true,
  },
  photo4: {
    type: String,
    require: true,
  },
});

export default UserPhotoSchema;
