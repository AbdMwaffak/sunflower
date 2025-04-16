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

export const getAllPerfume = createAsyncThunk(
  'perfume/getAllPerfume',
  async () => {
    const response = await axios.get(`/perfume`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getAllPerfumeSlice = createSlice({
  name: 'getAllPerfume',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPerfume.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllPerfume.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllPerfume.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getAllPerfumeSlice.reducer;
