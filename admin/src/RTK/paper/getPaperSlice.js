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

export const getPaper = createAsyncThunk('paper/getPaper', async () => {
  const response = await axios.get(`/papers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const getPaperSlice = createSlice({
  name: 'getPaper',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPaper.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getPaper.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getPaper.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getPaperSlice.reducer;
