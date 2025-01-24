import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';

/////////////
const cookies = new Cookies();
let token = '';
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token');
}
//////////////
export const addFlowerToCart = createAsyncThunk(
  'cart/addFlowerToCart',
  async (reqobj) => {
    const response = await axios.post(`/naturalFlowersOrders`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  }
);
const addFlowerToCartSlice = createSlice({
  name: 'addFlowerToCart',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addFlowerToCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addFlowerToCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(addFlowerToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default addFlowerToCartSlice.reducer;
