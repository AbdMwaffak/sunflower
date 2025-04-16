import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const postRegister = createAsyncThunk(
  'auth/postRegister',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/signup`, userCredentials);
      // console.log(response)
      return response.data;
    } catch (error2) {
      return rejectWithValue(error2.response.data);
    }
  }
);
export const postRegisterSlice = createSlice({
  name: 'postRegister',
  initialState: {
    data2: [],
    loading2: false,
    error2: null,
  },
  reducers: {
    back2: (state) => {
      state.data2 = [];
      state.error2 = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.loading2 = false;
      state.data2 = action.payload;
      // const cookies = new Cookies();
      // state.status = 'success';
      // cookies.set("token", state.data.token)
      // cookies.set("userId", state.data?.user?._id)
      // window.location.state = false
      // window.location.pathname = '/'
    });

    builder.addCase(postRegister.pending, (state, action) => {
      state.loading2 = true;
      state.error2 = null;
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.loading2 = false;
      state.data2 = [];
      state.error2 = action.payload;
    });
  },
});
export const { back2 } = postRegisterSlice.actions;
export default postRegisterSlice.reducer;
