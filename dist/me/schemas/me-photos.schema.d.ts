import mongoose from 'mongoose';
export interface IUserPhoto extends mongoose.Document {
    userIds: string;
    images: [String];
    test: Boolean;
}
declare const UserPhotoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    photo4?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    photo4?: string;
}>> & mongoose.FlatRecord<{
    userId?: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    photo4?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default UserPhotoSchema;
