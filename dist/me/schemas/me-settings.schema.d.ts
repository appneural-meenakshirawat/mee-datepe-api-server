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
declare const UserSettingsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: string;
    account?: {
        email?: string;
        phoneNumber?: string;
        Notification?: boolean;
        privacy?: any;
    };
    chat?: {
        controlWhoMsgU?: {
            readReceipt?: boolean;
            activityStatus?: boolean;
        };
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId?: string;
    account?: {
        email?: string;
        phoneNumber?: string;
        Notification?: boolean;
        privacy?: any;
    };
    chat?: {
        controlWhoMsgU?: {
            readReceipt?: boolean;
            activityStatus?: boolean;
        };
    };
}>> & mongoose.FlatRecord<{
    userId?: string;
    account?: {
        email?: string;
        phoneNumber?: string;
        Notification?: boolean;
        privacy?: any;
    };
    chat?: {
        controlWhoMsgU?: {
            readReceipt?: boolean;
            activityStatus?: boolean;
        };
    };
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default UserSettingsSchema;
