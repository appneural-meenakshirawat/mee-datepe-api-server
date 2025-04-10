import * as mongoose from 'mongoose';
export interface IMatchDocument extends mongoose.Document {
    firstUser: string;
    isActive: boolean;
    isReported: boolean;
    reportedBy: string;
    secondUser: string;
}
export declare const MatchSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    isActive?: boolean;
    isReported?: boolean;
    firstUser?: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    isActive?: boolean;
    isReported?: boolean;
    firstUser?: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    isActive?: boolean;
    isReported?: boolean;
    firstUser?: mongoose.Types.ObjectId;
    reportedBy?: mongoose.Types.ObjectId;
    secondUser?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
