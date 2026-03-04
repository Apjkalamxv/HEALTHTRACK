import {} from 'express';
import Workout from '../models/workoutModel.js';
// @desc    Get all workouts for logged in user
// @route   GET /api/workouts
export const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
};
// @desc    Add new workout
// @route   POST /api/workouts
export const addWorkout = async (req, res) => {
    const { name, sets, reps, category, difficulty, date } = req.body;
    const workout = new Workout({
        user: req.user._id,
        name,
        sets,
        reps,
        category,
        difficulty,
        date,
    });
    const createdWorkout = await workout.save();
    res.status(201).json(createdWorkout);
};
// @desc    Delete workout
// @route   DELETE /api/workouts/:id
export const deleteWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (workout) {
        if (workout.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await workout.deleteOne();
        res.json({ message: 'Workout removed' });
    }
    else {
        res.status(404).json({ message: 'Workout not found' });
    }
};
//# sourceMappingURL=workoutController.js.map