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

export const postNewCategory = createAsyncThunk(
  'categories/postNewCategory',
  async (reqobj) => {
    const response = await axios.post(`/category`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const postNewCategorySlice = createSlice({
  name: 'postNewCategory',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postNewCategory.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postNewCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(postNewCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default postNewCategorySlice.reducer;
