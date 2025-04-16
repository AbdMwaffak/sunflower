import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const verifying = createAsyncThunk(
  'auth/verifying',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/verify`, userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const verifyingSlice = createSlice({
  name: 'verifying',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    back3: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifying.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      const cookies = new Cookies();
      cookies.set('token', state.data.token, {
        path: '/',
        expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'Strict',
      });
      cookies.set('userId', state.data?.user?._id, {
        path: '/',
        expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'Strict',
      });
      window.location.reload();
      // window.location.state = false
      // window.location.pathname = '/'
    });
    builder.addCase(verifying.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifying.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action?.payload?.message;
    });
  },
});
export const { back3 } = verifyingSlice.actions;
export default verifyingSlice.reducer;
