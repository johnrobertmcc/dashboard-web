import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUser,
  logOut,
  logIn,
  editUser,
  fetchUser,
} from './authService.js';

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
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await registerUser(user);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Log In User.
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await logIn(user);
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Log Out User.
export const logout = createAsyncThunk('auth/logout', async () => {
  return await logOut();
});

// Edit User
export const edit = createAsyncThunk(
  'auth/editUser',
  async (user, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      await editUser(user, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//Fetch User
export const getInfo = createAsyncThunk(
  'auth/fetchUser',
  async (user, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      const fetchedUser = await fetchUser(user, token);
      console.log('jr fetchedUser', fetchedUser);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.isLoading = false;
      // setTimeout(() => (), 10000);
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
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action?.payload || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action?.payload || null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(edit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        debugger;
        state.user = action?.payload ? action?.meta?.arg : null;
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action?.payload || null;
        // state.user = null;
      })
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action?.payload ? action?.meta?.arg : null;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action?.payload || null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
