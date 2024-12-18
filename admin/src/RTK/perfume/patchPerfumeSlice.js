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

export const patchPerfume = createAsyncThunk(
  'perfume/patchPerfume',
  async (value) => {
    console.log([...value]);
    const response = await axios.patch(`/perfume`, value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);

const patchPerfumeSlice = createSlice({
  name: 'patchPerfume',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(patchPerfume.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(patchPerfume.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(patchPerfume.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default patchPerfumeSlice.reducer;
