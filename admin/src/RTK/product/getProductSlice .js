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

export const getProduct = createAsyncThunk('product/getProduct', async () => {
  const response = await axios.get(`/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const getProductSlice = createSlice({
  name: 'getProduct',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getProductSlice.reducer;
