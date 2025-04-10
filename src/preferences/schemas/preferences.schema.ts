import mongoose, { Document, Model } from 'mongoose';

export interface IPreference extends Document {
  name: string;
  type: string;
}

export const PreferencesSchema = new mongoose.Schema<IPreference>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);