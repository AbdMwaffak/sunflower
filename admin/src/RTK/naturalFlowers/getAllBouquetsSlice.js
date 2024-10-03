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

export const getAllBouquets = createAsyncThunk(
  'naturalFlowers/getAllBouquets',
  async () => {
    const response = await axios.get(`/naturalFlowers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);

const getAllBouquetsSlice = createSlice({
  name: 'getAllBouquets',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBouquets.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllBouquets.fulfilled, (state, action) => {
      state.data = action.payload;
      // console.log(state.data)
    });
    builder.addCase(getAllBouquets.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
      // console.log(state.error);
    });
  },
});
export default getAllBouquetsSlice.reducer;
