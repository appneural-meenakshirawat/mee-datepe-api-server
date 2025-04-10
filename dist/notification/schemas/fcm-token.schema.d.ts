import mongoose from 'mongoose';
export interface IFCMToken extends mongoose.Document {
    userId: string;
    fcmToken: string;
}
declare const FCMTokenSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: mongoose.Types.ObjectId;
    fcmToken?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId?: mongoose.Types.ObjectId;
    fcmToken?: string;
}>> & mongoose.FlatRecord<{
    userId?: mongoose.Types.ObjectId;
    fcmToken?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default FCMTokenSchema;
