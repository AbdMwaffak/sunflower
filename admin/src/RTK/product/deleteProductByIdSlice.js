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
}
//////////////

export const deleteProductById = createAsyncThunk(
  'product/deleteProductById',
  async (reqobj) => {
    console.log(reqobj);
    const response = await axios.delete(`/products/${reqobj}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response)
    return response.data;
  }
);

const deleteProductByIdSlice = createSlice({
  name: 'deleteProductById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProductById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deleteProductByIdSlice.reducer;
