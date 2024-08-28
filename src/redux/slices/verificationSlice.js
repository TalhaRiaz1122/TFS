import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constants';

// Async thunk to send verification email
export const sendVerificationEmail = createAsyncThunk(
  'verification/sendVerificationEmail',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/send-verification-email/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Async thunk to verify the email code based on token
export const verifyCode = createAsyncThunk(
  'verification/verifyCode',
  async ({token, code}, {rejectWithValue}) => {
    console.log('Token in api', token);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/verify-email-code/`,
        {code},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    resetVerificationStatus: state => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Send Verification Email
      .addCase(sendVerificationEmail.pending, state => {
        state.status = 'loading';
      })
      .addCase(sendVerificationEmail.fulfilled, state => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Verify Email Code
      .addCase(verifyCode.pending, state => {
        state.status = 'loading';
      })
      .addCase(verifyCode.fulfilled, state => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {resetVerificationStatus} = verificationSlice.actions;
export default verificationSlice.reducer;
