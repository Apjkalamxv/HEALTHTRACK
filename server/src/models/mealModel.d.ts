import mongoose, { type Document } from 'mongoose';
export interface IMeal extends Document {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    calories: number;
    portion: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    date: Date;
}
declare const Meal: mongoose.Model<IMeal, {}, {}, {}, mongoose.Document<unknown, {}, IMeal, {}, mongoose.DefaultSchemaOptions> & IMeal & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMeal>;
export default Meal;
//# sourceMappingURL=mealModel.d.ts.map