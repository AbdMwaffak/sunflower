import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = '';
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token');
}
//////////////
export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  async (id) => {
    const response = await axios.patch(
      `/articles/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data)
    return response.data;
  }
);
const likeArticleSlice = createSlice({
  name: 'likeArticle',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(likeArticle.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(likeArticle.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(likeArticle.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default likeArticleSlice.reducer;
