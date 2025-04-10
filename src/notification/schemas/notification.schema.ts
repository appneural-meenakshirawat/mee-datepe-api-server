import mongoose from 'mongoose';

export interface IUserNotification extends mongoose.Document {
  userId: string;
  fcmToken: string;
}

const UserNotificationSchema = new mongoose.Schema({
  fcmTokens: {
    type: [String],
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-Registration',
    require: true,
    unique: true,
  },
  notification: {
    title: String,
    body: String,
    imageUrl: String,
  },
  data: Object
}).set('timestamps', true);


export default UserNotificationSchema;
