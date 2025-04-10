import * as mongoose from 'mongoose';
export interface IWishListDocument extends mongoose.Document {
    firstUser: string;
    like: boolean;
    secondUser: string;
}
export declare const WishlistSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstUser?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
    like?: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    firstUser?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
    like?: boolean;
}>> & mongoose.FlatRecord<{
    firstUser?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
    like?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
