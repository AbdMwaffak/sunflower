import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const getAllOffers = createAsyncThunk('cart/getAllOffers', async () => {
  const response = await axios.get(`/offers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const getAllOffersSlice = createSlice({
  name: 'getAllOffers',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOffers.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllOffers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllOffers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getAllOffersSlice.reducer;
