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

export const postPaper = createAsyncThunk('paper/postPaper', async (reqobj) => {
  const response = await axios.post(`/papers`, reqobj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const postPaperSlice = createSlice({
  name: 'postPaper',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(postPaper.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postPaper.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(postPaper.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default postPaperSlice.reducer;
