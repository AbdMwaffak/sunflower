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

export const postImageToSlider = createAsyncThunk(
  'settings/postImageToSlider',
  async (reqobj) => {
    const response = await axios.post(`/settings`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  }
);

const postImageToSliderSlice = createSlice({
  name: 'postImageToSlider',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postImageToSlider.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postImageToSlider.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(postImageToSlider.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    });
  },
});
export default postImageToSliderSlice.reducer;
