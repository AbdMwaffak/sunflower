import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

/////////////
const cookies = new Cookies();
let token = '';
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token');
}
//////////////
export const getMe = createAsyncThunk('auth/getMe', async () => {
  const response = await axios.get(`/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response.data)
  return response.data;
});
const getMeSlice = createSlice({
  name: 'getMe',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getMeSlice.reducer;
