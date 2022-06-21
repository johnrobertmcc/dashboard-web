import express from 'express';
import dotenv from 'dotenv';
import budgetRoute from './routes/budgetRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/budget', budgetRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
