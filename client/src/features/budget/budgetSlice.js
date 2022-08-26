import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import budgetService from './budgetService';

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// Register User.
export const publishItem = createAsyncThunk(
  'budget/create',
  async (budgetItem, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.sendItemToDB(budgetItem, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      console.error('ERROR: ', message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all goals by UserId.
export const getBudget = createAsyncThunk(
  'budget/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.getBudgetItems(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      console.error('ERROR: ', message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'budget/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.deleteBudgetItem(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const budgetSlice = createSlice({
  name: 'budgetItem',
  initialState,
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(publishItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(publishItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.raw.budget.push(action?.payload?.budget);
        state.items.data = budgetService.handleBudgetItems(state.items.raw);
      })
      .addCase(publishItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
