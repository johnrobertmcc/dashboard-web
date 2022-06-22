import express from 'express';
import dotenv from 'dotenv';
import budgetRoute from './routes/budgetRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import colors from 'colors'; // Allows the use of Colors in temrinal.
dotenv.config();
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/budget', budgetRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
