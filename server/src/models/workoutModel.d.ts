import mongoose, { type Document } from 'mongoose';
export interface IWorkout extends Document {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    sets: number;
    reps: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    date: Date;
}
declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default Workout;
//# sourceMappingURL=workoutModel.d.ts.map