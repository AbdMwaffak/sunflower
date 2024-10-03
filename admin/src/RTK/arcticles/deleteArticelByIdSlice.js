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

export const deleteArticelById = createAsyncThunk(
  'articles/deleteArticelById',
  async (reqobj) => {
    const response = await axios.patch(
      `/articles/delete/${reqobj.id}`,
      { pass: reqobj.pass },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response)
    return response.data;
  }
);

const deleteArticelByIdSlice = createSlice({
  name: 'deleteArticelById',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteArticelById.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteArticelById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(deleteArticelById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default deleteArticelByIdSlice.reducer;
