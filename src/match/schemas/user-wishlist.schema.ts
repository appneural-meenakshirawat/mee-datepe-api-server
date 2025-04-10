import * as mongoose from 'mongoose';

export interface IWishListDocument extends mongoose.Document {
  firstUser: string;
  like: boolean;
  secondUser: string;
}

export const WishlistSchema = new mongoose.Schema({
  firstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
  like: Boolean,
  secondUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);
