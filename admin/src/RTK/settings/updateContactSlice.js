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

export const updateContact = createAsyncThunk(
  'settings/updateContact',
  async (reqobj) => {
    const response = await axios.patch(`/settings`, reqobj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const updateContactSlice = createSlice({
  name: 'updateContact',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateContact.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(updateContact.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default updateContactSlice.reducer;
