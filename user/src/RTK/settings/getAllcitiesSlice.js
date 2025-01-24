import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const getAllcities = createAsyncThunk(
  'settings/getAllcities',
  async () => {
    const response = await axios.get(`/cities`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);

const getAllcitiesSlice = createSlice({
  name: 'getAllcities',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllcities.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllcities.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllcities.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    });
  },
});
export default getAllcitiesSlice.reducer;
