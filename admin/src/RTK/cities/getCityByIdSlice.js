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

export const getCityById = createAsyncThunk(
  'cities/getCityById',
  async (id) => {
    const response = await axios.get(`/cities/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getCityByIdSlice = createSlice({
  name: 'getCityById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCityById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCityById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getCityById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getCityByIdSlice.reducer;
