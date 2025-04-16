import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const postLogin = createAsyncThunk(
  'register/postRegister',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/login`, userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postLoginReducer = createSlice({
  name: 'postLogin',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    back1: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(postLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
  },
});

export const { back1 } = postLoginReducer.actions;
export default postLoginReducer.reducer;
