// redux/slices/userSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constants';

// Initial state
const initialState = {
  user: null,
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

// Register user async thunk
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/register/`,
        userData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Login user async thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/login/`,
        credentials,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = null;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      // Register user cases
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Login user cases
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
