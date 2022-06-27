import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice.js';
import budgetReducer from 'features/budget/budgetSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
  },
});
