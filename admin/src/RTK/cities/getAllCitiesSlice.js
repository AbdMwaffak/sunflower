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

export const getAllCities = createAsyncThunk(
  'cities/getAllCities',
  async () => {
    const response = await axios.get(`/cities`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getAllCitiesSlice = createSlice({
  name: 'getAllCities',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCities.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllCities.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getAllCitiesSlice.reducer;
