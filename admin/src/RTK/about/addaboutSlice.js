import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import SuccessfulMessage from '../../allExtensions/successfulMessage/SuccessfulMessage';
import { Alert } from 'bootstrap';
import toast from 'react-hot-toast';

/////////////
const cookies = new Cookies();
let token = '';

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken');
}
//////////////

export const addabout = createAsyncThunk('about/addabout', async (reqobj) => {
  const response = await axios.post(`/aboutus`, reqobj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log(response.data)
  return response.data;
});

const addaboutSlice = createSlice({
  name: 'addabout',
  initialState: {
    data: [],
    status: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(addabout.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addabout.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(addabout.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});

export default addaboutSlice.reducer;
