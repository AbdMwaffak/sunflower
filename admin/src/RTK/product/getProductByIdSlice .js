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

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id) => {
    const response = await axios.get(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getProductByIdSlice = createSlice({
  name: 'getProductById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getProductByIdSlice.reducer;
