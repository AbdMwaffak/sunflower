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

export const getCategoryById = createAsyncThunk(
  'categories/getCategoryById',
  async (id) => {
    const response = await axios.get(`/api/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getCategoryByIdSlice = createSlice({
  name: 'getCategoryById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getCategoryByIdSlice.reducer;
