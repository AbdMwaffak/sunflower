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

export const patchVariants = createAsyncThunk(
  'perfume/patchVariants',
  async (value) => {
    console.log(value.available);
    const response = await axios.patch(
      `/perfume/updateVariants/${value.id}`,
      { available: value.available },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data)
    return response.data;
  }
);

const patchVariantsSlice = createSlice({
  name: 'patchVariants',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(patchVariants.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(patchVariants.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    });
    builder.addCase(patchVariants.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message));
    });
  },
});
export default patchVariantsSlice.reducer;
