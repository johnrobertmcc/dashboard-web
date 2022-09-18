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
    console.log('jr budgetItem', budgetItem);
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

// Delete a budget item
export const deleteBudgetItem = createAsyncThunk(
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

// Edit a budget item.
export const editBudgetItem = createAsyncThunk(
  'budget/edit',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.editBudgetItem(id, token);
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
        state.items.budget.push(action?.payload?.budget);
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
      .addCase(deleteBudgetItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBudgetItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.budget = state.items.budget.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteBudgetItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editBudgetItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBudgetItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.budget = state.items.budget.map((item) => {
          if (item?._id === action.payload.id) {
            return action.payload.updated;
          } else {
            return item;
          }
        });
      })
      .addCase(editBudgetItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
