import mongoose, { Document, Model } from 'mongoose';

export interface IUserRegister extends Document {
  name: string;
  uname: string;
  mobileNo: string;
  email: string;
  dob: { type: Date; required: true };
  address: string;
  profilePic: string;
  images: [string];
  location: {
    type: string;
    coordinates: number[];
  };
  isCompleted: boolean,
  stage: number
}

export const UserRegisterSchema = new mongoose.Schema<IUserRegister>(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    uname: {
      type: String,
      // required: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },
    dob: {
      type: String,
      // required: true,
      trim: true,
    },
    profilePic: String,
    images: [String],
    address: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    stage: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  },
);

UserRegisterSchema.index({ location: '2dsphere' });

const User: Model<IUserRegister> = mongoose.model('User', UserRegisterSchema);

export default User;
