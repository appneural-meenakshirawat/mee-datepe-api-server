import * as mongoose from 'mongoose';

export interface IMatchDocument extends mongoose.Document {
  firstUser: string;
  isActive: boolean;
  isReported: boolean;
  reportedBy: string;
  secondUser: string;
}

export const MatchSchema = new mongoose.Schema({
  firstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
  isActive: Boolean,
  isReported: Boolean,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
  secondUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);
