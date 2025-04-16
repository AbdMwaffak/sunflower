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

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await axios.get(`/category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getCategoriesSlice.reducer;
