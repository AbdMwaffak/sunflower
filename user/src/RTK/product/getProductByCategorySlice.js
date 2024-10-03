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
export const getProductByCategory = createAsyncThunk(
  'product/getProductByCategory',
  async (id) => {
    const response = await axios.get(`/products?category=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const getProductByCategorySlice = createSlice({
  name: 'getProductByCategory',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductByCategory.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getProductByCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getProductByCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getProductByCategorySlice.reducer;
