import { type Request, type Response } from 'express';
import Meal from '../models/mealModel.js';

// @desc    Get all meals for logged in user
// @route   GET /api/meals
export const getMeals = async (req: any, res: Response) => {
    const meals = await Meal.find({ user: req.user._id });
    res.json(meals);
};

// @desc    Add new meal
// @route   POST /api/meals
export const addMeal = async (req: any, res: Response) => {
    const { name, calories, portion, type, date } = req.body;

    const meal = new Meal({
        user: req.user._id,
        name,
        calories,
        portion,
        type,
        date,
    });

    const createdMeal = await meal.save();
    res.status(201).json(createdMeal);
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
export const deleteMeal = async (req: any, res: Response) => {
    const meal = await Meal.findById(req.params.id);

    if (meal) {
        if (meal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await meal.deleteOne();
        res.json({ message: 'Meal removed' });
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
};
