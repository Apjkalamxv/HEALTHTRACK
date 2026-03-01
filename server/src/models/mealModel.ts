import mongoose, { Schema, type Document } from 'mongoose';

export interface IMeal extends Document {
    user: mongoose.Schema.Types.ObjectId;
    name: string;
    calories: number;
    portion: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    date: Date;
}

const mealSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    portion: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'snacks']
    },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Meal = mongoose.model<IMeal>('Meal', mealSchema);
export default Meal;
