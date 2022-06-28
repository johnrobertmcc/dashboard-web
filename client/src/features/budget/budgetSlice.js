import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendItemToDB, getBudgetItems } from './budgetService';

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
      return await sendItemToDB(budgetItem, token);
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
      return await getBudgetItems(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      console.error('ERROR: ', message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const budgetSlice = createSlice({
  name: 'budgetItem',
  initialState,
  reducers: (state) => initialState,
  extraReducers: (builder) => {
    builder
      .addCase(publishItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(publishItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.budget.push(action.payload.budget);
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
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
