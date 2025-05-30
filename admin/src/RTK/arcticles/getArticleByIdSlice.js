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

export const getArticleById = createAsyncThunk(
  'articles/getArticleById',
  async (id) => {
    const response = await axios.get(`/api/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getArticleByIdSlice = createSlice({
  name: 'getArticleById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getArticleById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getArticleById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getArticleById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getArticleByIdSlice.reducer;
