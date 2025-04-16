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

export const patchMe = createAsyncThunk('settings/patchMe', async () => {
  const response = await axios.patch(`/settings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response.data)
  return response.data;
});

const patchMeSlice = createSlice({
  name: 'patchMe',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(patchMe.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(patchMe.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(patchMe.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default patchMeSlice.reducer;
