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
export const getOrders = createAsyncThunk('cart/getOrders', async (id) => {
  const response = await axios.get(`/orders?userId=${id?.userId}`, {
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
