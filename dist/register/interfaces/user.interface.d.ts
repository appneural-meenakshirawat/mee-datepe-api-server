import mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    resetToken?: string;
    resetTokenExpiration?: Date;
    findOneByEmail(email: string): Promise<IUser | null>;
    getUserById(id: string): Promise<IUser | null>;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default User;
