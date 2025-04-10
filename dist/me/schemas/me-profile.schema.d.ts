import mongoose from 'mongoose';
export interface IUserPhoto extends mongoose.Document {
    userId: string;
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
}
declare const UserProfileSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    images: string[];
    interest: string[];
    userId?: string;
    bio?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    images: string[];
    interest: string[];
    userId?: string;
    bio?: string;
}>> & mongoose.FlatRecord<{
    images: string[];
    interest: string[];
    userId?: string;
    bio?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default UserProfileSchema;
