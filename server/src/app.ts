import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'YOUR_RENDER_FRONTEND_LINK_HERE' // <--- PASTE YOUR RENDER LINK HERE
    ],
    credentials: true
}));
=======
app.use(cors({orgin:['https://healthyfy-frontend1.onrender.com/signin'],
              credentials:true}));
>>>>>>> 21a0ddc31144bda4bc30aac339f24f19dac09a18
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Healthyfy API is running...');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

export default app;
