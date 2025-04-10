import mongoose from 'mongoose';
export interface IUserPreference extends mongoose.Document {
    userId: string;
    preferenceIds: string[];
    type: string;
}
declare const UserPreferenceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    preferenceIds: mongoose.Types.ObjectId[];
    type?: string;
    userId?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    preferenceIds: mongoose.Types.ObjectId[];
    type?: string;
    userId?: string;
}>> & mongoose.FlatRecord<{
    preferenceIds: mongoose.Types.ObjectId[];
    type?: string;
    userId?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default UserPreferenceSchema;
