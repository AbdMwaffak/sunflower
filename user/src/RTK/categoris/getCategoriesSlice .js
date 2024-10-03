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
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await axios.get(`/category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  }
);

const getCategoriesSlice = createSlice({
  name: 'getCategories',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getCategoriesSlice.reducer;
