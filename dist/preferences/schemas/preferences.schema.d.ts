import mongoose, { Document } from 'mongoose';
export interface IPreference extends Document {
    name: string;
    type: string;
}
export declare const PreferencesSchema: mongoose.Schema<IPreference, mongoose.Model<IPreference, any, any, any, mongoose.Document<unknown, any, IPreference> & IPreference & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IPreference, mongoose.Document<unknown, {}, mongoose.FlatRecord<IPreference>> & mongoose.FlatRecord<IPreference> & {
    _id: mongoose.Types.ObjectId;
}>;
