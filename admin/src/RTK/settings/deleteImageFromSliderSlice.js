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

export const deleteImageFromSlider = createAsyncThunk(
  'settings/deleteImageFromSlider',
  async (id) => {
    const response = await axios.delete(`/settings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  }
);

const deleteImageFromSliderSlice = createSlice({
  name: 'deleteImageFromSlider',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteImageFromSlider.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteImageFromSlider.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteImageFromSlider.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    });
  },
});
export default deleteImageFromSliderSlice.reducer;
