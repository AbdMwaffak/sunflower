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

export const getaboutById = createAsyncThunk(
  'about/getaboutById',
  async (id) => {
    const response = await axios.get(`/aboutus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getaboutByIdSlice = createSlice({
  name: 'getaboutById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getaboutById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getaboutById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getaboutById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getaboutByIdSlice.reducer;
