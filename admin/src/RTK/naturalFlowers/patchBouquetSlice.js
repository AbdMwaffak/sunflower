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

export const patchBouquet = createAsyncThunk(
  'naturalFlowers/patchBouquet',
  async (value) => {
    const response = await axios.patch(
      `/naturalFlowers/${value.id}`,
      value?.reqobj,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data)
    return response.data;
  }
);

const patchBouquetSlice = createSlice({
  name: 'patchBouquet',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(patchBouquet.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(patchBouquet.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(patchBouquet.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default patchBouquetSlice.reducer;
