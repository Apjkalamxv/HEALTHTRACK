import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    sets: number;
    reps: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    date: Date;
}

const workoutSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
