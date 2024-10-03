import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import toast from 'react-hot-toast';

/////////////
const cookies = new Cookies();
let token = '';
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token');
}
//////////////
export const removeNFromCart = createAsyncThunk(
  'cart/removeNFromCart',
  async (id) => {
    const response = await axios.delete(`/naturalFlowersOrders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const removeNFromCartSlice = createSlice({
  name: 'removeNFromCart',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(removeNFromCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(removeNFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(removeNFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default removeNFromCartSlice.reducer;
