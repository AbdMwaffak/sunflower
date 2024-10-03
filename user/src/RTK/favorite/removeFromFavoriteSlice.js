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
export const removeFromFavorite = createAsyncThunk(
  'favorite/removeFromFavorite',
  async (id) => {
    const response = await axios.patch(`/users/removeFromFavorite`, id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data)
    return response.data;
  }
);
const removeFromFavoriteSlice = createSlice({
  name: 'removeFromFavorite',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(removeFromFavorite.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(removeFromFavorite.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(removeFromFavorite.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default removeFromFavoriteSlice.reducer;
