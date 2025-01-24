import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const postLogin = createAsyncThunk(
  'register/postRegister',
  async (reqobj) => {
    const response = await axios.post(`/users/login`, reqobj);
    console.log(response.data);
    return response.data;
  }
);

export const postLoginReducer = createSlice({
  name: 'postLogin',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      console.log('success');

      const cookies = new Cookies();
      cookies.set('adminToken', state.data.token);
      window.location.pathname = '/MyCategory';
    });

    builder.addCase(postLogin.pending, (state, action) => {
      state.status = 'loading';
      console.log(state.status);
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    });
  },
});

export default postLoginReducer.reducer;
