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

export const deleteImageFromSlider = createAsyncThunk(
  'settings/deleteImageFromSlider',
  async (id) => {
    const response = await axios.delete(`/settings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
      state.status = 'successful';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(deleteImageFromSlider.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deleteImageFromSliderSlice.reducer;
