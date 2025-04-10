import * as mongoose from 'mongoose';
export declare const ChatSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    message?: string;
    roomId?: mongoose.Types.ObjectId;
    sentTo?: mongoose.Types.ObjectId;
    sentBy?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    message?: string;
    roomId?: mongoose.Types.ObjectId;
    sentTo?: mongoose.Types.ObjectId;
    sentBy?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    message?: string;
    roomId?: mongoose.Types.ObjectId;
    sentTo?: mongoose.Types.ObjectId;
    sentBy?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const ChatRoomSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    users: mongoose.Types.ObjectId[];
    chats: mongoose.Types.ObjectId[];
    isActive: boolean;
    lastMessage?: string;
    lastSeen?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    users: mongoose.Types.ObjectId[];
    chats: mongoose.Types.ObjectId[];
    isActive: boolean;
    lastMessage?: string;
    lastSeen?: Date;
}>> & mongoose.FlatRecord<{
    users: mongoose.Types.ObjectId[];
    chats: mongoose.Types.ObjectId[];
    isActive: boolean;
    lastMessage?: string;
    lastSeen?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
