import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const getAllSettings = createAsyncThunk(
  'settings/getAllSettings',
  async () => {
    const response = await axios.get(`/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getAllSettingsSlice = createSlice({
  name: 'getAllSettings',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSettings.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllSettings.fulfilled, (state, action) => {
      state.status = 'successful';
      state.data = action.payload;
    });
    builder.addCase(getAllSettings.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});
export default getAllSettingsSlice.reducer;
