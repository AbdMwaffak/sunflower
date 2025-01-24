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
export const getOrders = createAsyncThunk('cart/getOrders', async () => {
  const response = await axios.get(`/orders?sort=-createdAt`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response.data)
  return response.data;
});
const getOrdersSlice = createSlice({
  name: 'getOrders',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getOrdersSlice.reducer;
