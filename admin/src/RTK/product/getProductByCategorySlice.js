import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const getProductByCategory = createAsyncThunk(
  'product/getProductByCategory',
  async (categoryId) => {
    const response = await axios.get(`/products?category=${categoryId}`, {
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
      // console.log(state.data)
    });
    builder.addCase(getProductByCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
      // console.log(state.error);
    });
  },
});
export default getProductByCategorySlice.reducer;
