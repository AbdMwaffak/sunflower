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
export const getaboutById = createAsyncThunk(
  'cart/getaboutById',
  async (id) => {
    const response = await axios.get(`/aboutus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const getaboutByIdSlice = createSlice({
  name: 'getaboutById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getaboutById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getaboutById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getaboutById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    });
  },
});
export default getaboutByIdSlice.reducer;
