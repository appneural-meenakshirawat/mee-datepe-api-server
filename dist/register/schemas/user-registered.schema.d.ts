import mongoose, { Document, Model } from 'mongoose';
export interface IUserRegister extends Document {
    name: string;
    uname: string;
    mobileNo: string;
    email: string;
    dob: {
        type: Date;
        required: true;
    };
    address: string;
    profilePic: string;
    images: [string];
    location: {
        type: string;
        coordinates: number[];
    };
    isCompleted: boolean;
    stage: number;
}
export declare const UserRegisterSchema: mongoose.Schema<IUserRegister, mongoose.Model<IUserRegister, any, any, any, mongoose.Document<unknown, any, IUserRegister> & IUserRegister & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUserRegister, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUserRegister>> & mongoose.FlatRecord<IUserRegister> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const User: Model<IUserRegister>;
export default User;
