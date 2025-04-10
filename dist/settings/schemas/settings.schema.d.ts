import mongoose, { Document } from 'mongoose';
export interface ISettings extends Document {
    name: string;
    isWaiting: boolean;
}
export declare const SettingsSchema: mongoose.Schema<ISettings, mongoose.Model<ISettings, any, any, any, mongoose.Document<unknown, any, ISettings> & ISettings & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ISettings, mongoose.Document<unknown, {}, mongoose.FlatRecord<ISettings>> & mongoose.FlatRecord<ISettings> & {
    _id: mongoose.Types.ObjectId;
}>;
export default SettingsSchema;
