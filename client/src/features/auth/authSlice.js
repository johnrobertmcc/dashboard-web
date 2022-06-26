import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from './authService.js';

/**
 * Feature used to authenticate a user as the owner of the DB budgetItems from local storage.
 */
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Register User.
const register = createAsyncThunk('/auth/register', async (user, thunkApi) => {
  try {
    return await registerUser(user);
  } catch (e) {
    const message =
      e?.response?.data?.message || e?.message || e.toString() || null;
    return thunkApi.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action?.payload || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action?.payload || null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
