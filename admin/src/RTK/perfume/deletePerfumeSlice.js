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

export const deletePerfume = createAsyncThunk(
  'perfume/deletePerfume',
  async (reqobj) => {
    const response = await axios.post(`/perfume`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const deletePerfumeSlice = createSlice({
  name: 'deletePerfume',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deletePerfume.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deletePerfume.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(deletePerfume.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deletePerfumeSlice.reducer;
