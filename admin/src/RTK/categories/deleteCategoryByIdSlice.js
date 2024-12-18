import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const deleteCategoryById = createAsyncThunk(
  'categories/deleteCategoryById',
  async (id) => {
    const response = await axios.patch(
      `/category/delete/${id}`,
      { pass: 'hi' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data)
    return response.data;
  }
);

const deleteCategoryByIdSlice = createSlice({
  name: 'deleteCategoryById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCategoryById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));

      window.location.pathname = '/MyCategory';
    });
    builder.addCase(deleteCategoryById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deleteCategoryByIdSlice.reducer;
