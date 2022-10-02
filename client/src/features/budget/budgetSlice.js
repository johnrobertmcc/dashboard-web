import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import budgetService from './budgetService';

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// Publish a single item to the budget.
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

// Get all budget items by UserId.
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

// Delete an entire budget.
export const deleteUserBudget = createAsyncThunk(
  '/budget/deleteAll',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.deleteEntireBudget(id, token);
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

// Add multiple items to DB.
export const uploadItems = createAsyncThunk(
  '/budget/id',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await budgetService.sendMultipleItems(data, token);
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
      })
      .addCase(deleteUserBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUserBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.budget.push(...action.payload.insertion);
      })
      .addCase(uploadItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
