import express from 'express';
import dotenv from 'dotenv';
import budgetRoute from './routes/budgetRoutes.js';
import userRoute from './routes/userRoute.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import colors from 'colors'; // Allows the use of Colors in terminal.
dotenv.config();
const port = process.env.PORT || 8000;
import cors from 'cors';
connectDB();
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/budget', budgetRoute);
app.use('/api/v1/user', userRoute);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on port: ${port}`.underline.white.red)
);
