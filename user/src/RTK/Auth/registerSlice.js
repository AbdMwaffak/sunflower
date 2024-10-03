import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const postRegister = createAsyncThunk(
  'auth/postRegister',
  async (reqobj) => {
    const response = await axios.post(`/users/signup`, reqobj);
    // console.log(response.data)
    return response.data;
  }
);
export const postRegisterSlice = createSlice({
  name: 'postRegister',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      const cookies = new Cookies();
      cookies.set('token', state.data.token);
      window.location.pathname = '/';
    });

    builder.addCase(postRegister.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});

export default postRegisterSlice.reducer;
