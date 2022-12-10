import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice.js';
import budgetReducer from 'features/budget/budgetSlice.js';

/**
 * The global redux store containing different reducers.
 *  auth - Returns the authentication and verified user details.
 *  budget - Returns the user's budget information.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
  },
});
