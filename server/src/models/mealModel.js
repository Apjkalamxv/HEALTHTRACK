import mongoose, { Schema } from 'mongoose';
const mealSchema = new Schema({
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
const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
//# sourceMappingURL=mealModel.js.map