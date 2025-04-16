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
export const orderProcessing = createAsyncThunk(
  'cart/orderProcessing',
  async (id) => {
    const response = await axios.patch(
      `/orders/changeState/${id?.orderId}`,
      { orderStatus: 'delivered' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);
const orderProcessingSlice = createSlice({
  name: 'orderProcessing',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(orderProcessing.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(orderProcessing.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(orderProcessing.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default orderProcessingSlice.reducer;
