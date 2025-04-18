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

export const getAllMessage = createAsyncThunk(
  'message/getAllMessage',
  async () => {
    const response = await axios.get(`/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const getAllMessageSlice = createSlice({
  name: 'getAllMessage',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessage.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAllMessage.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getAllMessage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    });
  },
});
export default getAllMessageSlice.reducer;
