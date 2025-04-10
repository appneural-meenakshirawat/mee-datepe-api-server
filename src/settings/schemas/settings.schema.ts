import mongoose, { Document } from 'mongoose';

export interface ISettings extends Document {
  name: string;
  isWaiting: boolean
}

export const SettingsSchema = new mongoose.Schema<ISettings>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isWaiting: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

export default SettingsSchema;
