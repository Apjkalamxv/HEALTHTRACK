import {} from 'express';
import Meal from '../models/mealModel.js';
import Workout from '../models/workoutModel.js';
// @desc    Get user dashboard statistics
// @route   GET /api/user/stats
export const getUserStats = async (req, res) => {
    const userId = req.user._id;
    // Get today's total calories
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const meals = await Meal.find({
        user: userId,
        date: { $gte: startOfDay, $lte: endOfDay }
    });
    const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
    // Get total workouts for the week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const weeklyWorkouts = await Workout.countDocuments({
        user: userId,
        date: { $gte: startOfWeek }
    });
    res.json({
        totalCalories,
        weeklyWorkouts,
        goalCalories: 2200 // Default goal for now
    });
};
//# sourceMappingURL=userController.js.map