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
export const upDateFromCart = createAsyncThunk(
  'cart/upDateFromCart',
  async (reqobj) => {
    const response = await axios.patch(`/shoppingCart/`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const upDateFromCartSlice = createSlice({
  name: 'upDateFromCart',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(upDateFromCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(upDateFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(upDateFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default upDateFromCartSlice.reducer;
