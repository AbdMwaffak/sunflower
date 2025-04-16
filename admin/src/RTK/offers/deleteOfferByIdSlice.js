import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const deleteOfferById = createAsyncThunk(
  'categories/deleteOfferById',
  async (id) => {
    const response = await axios.delete(`/offers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const deleteOfferByIdSlice = createSlice({
  name: 'deleteOfferById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteOfferById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOfferById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
      window.location.pathname = '/MyOffers';
    });
    builder.addCase(deleteOfferById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deleteOfferByIdSlice.reducer;
