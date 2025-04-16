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

export const addProductToOffer = createAsyncThunk(
  'cart/addProductToOffer',
  async (value) => {
    const response = await axios.post(`/offers/${value.id}`, value.reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const addProductToOfferSlice = createSlice({
  name: 'addProductToOffer',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToOffer.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addProductToOffer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(addProductToOffer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default addProductToOfferSlice.reducer;
