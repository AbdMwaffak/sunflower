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
export const addToFavorite = createAsyncThunk(
  'favorite/addToFavorite',
  async (id) => {
    const response = await axios.patch(`/users/handleFavorite`, id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const addToFavoriteSlice = createSlice({
  name: 'addToFavorite',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavorite.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addToFavorite.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(addToFavorite.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default addToFavoriteSlice.reducer;
