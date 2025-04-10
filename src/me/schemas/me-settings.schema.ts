import mongoose from 'mongoose';

export interface IUserSettings extends mongoose.Document {
  userId: string;
  account: {
    phoneNumber: string;
    privacy: object;
    email: string;
    Notification: boolean;
  };
  chat: {
    controlWhoMsgU: {
      readReceipt: boolean;
      activityStatus: boolean;
    };
  };
}

const UserSettingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User-Registration',
    require: true,
    unique: true,
  },
  account: {
    phoneNumber: String,
    privacy: {},
    email: String,
    Notification: Boolean,
  },
  chat: {
    controlWhoMsgU: {
      readReceipt: Boolean,
      activityStatus: Boolean,
    },
  },
});

export default UserSettingsSchema;
