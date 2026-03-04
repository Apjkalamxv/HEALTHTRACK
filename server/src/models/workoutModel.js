import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
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
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
//# sourceMappingURL=workoutModel.js.map