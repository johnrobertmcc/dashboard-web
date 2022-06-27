import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const budgetSlice = createSlice({
  name: 'budgetItem',
  initialState,
  reducers: (state) => initialState,
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
