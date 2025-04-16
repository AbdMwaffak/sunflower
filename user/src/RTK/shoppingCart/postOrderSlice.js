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
export const postOrder = createAsyncThunk(
  'cart/postOrder',
  async (reqobj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/orders`, reqobj, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const postOrderSlice = createSlice({
  name: 'postOrder',
  initialState: {
    data: [],
    error: null,
    status: 'failed',
  },
  reducers: {
    back: (state) => {
      state.data = [];
      state.error = null;
      state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      // state.loading = true;
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      // state.loading = false;
      state.error = null;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.status = 'failed';
      // state.loading = false;
      state.error = action?.payload?.message;
      // toast.error(JSON.stringify(action.error.message))
    });
  },
});
export const { back } = postOrderSlice.actions;
export default postOrderSlice.reducer;
