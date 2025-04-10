import mongoose from 'mongoose';
export interface IUserNotification extends mongoose.Document {
    userId: string;
    fcmToken: string;
}
declare const UserNotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    fcmTokens: string[];
    data?: any;
    userId?: mongoose.Types.ObjectId;
    notification?: {
        title?: string;
        body?: string;
        imageUrl?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    fcmTokens: string[];
    data?: any;
    userId?: mongoose.Types.ObjectId;
    notification?: {
        title?: string;
        body?: string;
        imageUrl?: string;
    };
}>> & mongoose.FlatRecord<{
    fcmTokens: string[];
    data?: any;
    userId?: mongoose.Types.ObjectId;
    notification?: {
        title?: string;
        body?: string;
        imageUrl?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default UserNotificationSchema;
