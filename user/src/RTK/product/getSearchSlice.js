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
export const getSearch = createAsyncThunk(
  'product/getSearch',
  async (reqobj) => {
    const response = await axios.get(`/products/search?query=${reqobj}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const getSearchSlice = createSlice({
  name: 'getSearch',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getSearch.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(getSearch.rejected, (state, action) => {
      state.status = 'failed';
      state.data = [];
      state.error = action.error.payload;
    });
  },
});
export default getSearchSlice.reducer;
