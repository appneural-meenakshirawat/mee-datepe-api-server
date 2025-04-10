import mongoose from 'mongoose';

export interface IFCMToken extends mongoose.Document {
  userId: string;
  fcmToken: string;
}

const FCMTokenSchema = new mongoose.Schema({
  userId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-Registration',
    require: true,
    unique: true,
  },
  fcmToken: {
    type: String,
    require: true,
  },
}).set('timestamps', true);


export default FCMTokenSchema;
