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

export const postBand = createAsyncThunk('Band/postBand', async (reqobj) => {
  const response = await axios.post(`/bands`, reqobj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response.data)
  return response.data;
});

const postBandSlice = createSlice({
  name: 'postBand',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postBand.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postBand.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(postBand.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default postBandSlice.reducer;
