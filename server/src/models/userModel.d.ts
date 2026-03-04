import mongoose, { type Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    matchPassword(password: string): Promise<boolean>;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=userModel.d.ts.map