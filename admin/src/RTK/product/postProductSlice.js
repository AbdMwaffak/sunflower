import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
} else console.log('you are not logged in');
//////////////

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (reqobj) => {
    const response = await axios.post(`/products`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);

const postProductSlice = createSlice({
  name: 'postProduct',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postProduct.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify('product added successfully.'));
    });
    builder.addCase(postProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default postProductSlice.reducer;
