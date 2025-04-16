import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import toast from 'react-hot-toast';


/////////////
const cookies = new Cookies();
let token = ''

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken')
}
//////////////

export const deleteaboutById = createAsyncThunk(
  'about/deleteaboutById',
  async (id) => {
    const response = await axios.delete(`/aboutus/${id}`
      , { headers: { "Authorization": `Bearer ${token}` } })
    return response.data;
  })

const deleteaboutByIdSlice = createSlice({
  name: 'deleteaboutById',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(deleteaboutById.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(deleteaboutById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));

    })
    builder.addCase(deleteaboutById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.success(JSON.stringify(action.payload));
    })

  }



})
export default deleteaboutByIdSlice.reducer;