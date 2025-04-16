import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import toast from 'react-hot-toast';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////
export const deleteCityById = createAsyncThunk(
  'cities/deleteCityById',
  async (id) => {
    const response = await axios.delete(`/cities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const deleteCityByIdSlice = createSlice({
  name: 'deleteCityById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCityById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCityById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(deleteCityById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.success(JSON.stringify(action.payload));
    });
  },
});
export default deleteCityByIdSlice.reducer;
