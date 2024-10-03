import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const stateCategoryById = createAsyncThunk(
  'categories/stateCategoryById',
  async (id) => {
    const response = await axios.patch(
      `/category/changeState/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data)
    return response.data;
  }
);

const stateCategoryByIdSlice = createSlice({
  name: 'stateCategoryById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(stateCategoryById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(stateCategoryById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(stateCategoryById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default stateCategoryByIdSlice.reducer;
