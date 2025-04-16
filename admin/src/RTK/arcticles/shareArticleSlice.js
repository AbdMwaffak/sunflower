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

export const shareArticle = createAsyncThunk(
  'articles/shareArticle',
  async (id) => {
    const response = await axios.patch(`/articles/share/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const shareArticleSlice = createSlice({
  name: 'shareArticle',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(shareArticle.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(shareArticle.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
    });
    builder.addCase(shareArticle.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default shareArticleSlice.reducer;
