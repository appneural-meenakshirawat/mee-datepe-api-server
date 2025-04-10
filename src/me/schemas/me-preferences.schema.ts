import mongoose from 'mongoose';

export interface IUserPreference extends mongoose.Document {
  userId: string;
  preferenceIds: string[];
  type: string;
  // findOneByEmail(email: string): Promise<IPreferences | null>;
  // getUserById(id: string): Promise<IPreferences | null>;
}

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User-Registration',
    require: true,
    // unique: true,
  },
  preferenceIds: {
    // type: [String],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Preference',
    require: false,
  },
  type: {
    type: String,
    require: true,
  },
});

export default UserPreferenceSchema;
