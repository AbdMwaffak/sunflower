import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';
import toast from 'react-hot-toast';

/////////////
const cookies = new Cookies();
let token = ''
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token')
}
//////////////
export const deleteMessage = createAsyncThunk(
  'message/deleteMessage',
  async (id) => {
    const response = await axios.delete(`${Api}/messages/${id}`
      , { headers: { "Authorization": `Bearer ${token}` } })
    console.log(response.data)
    return response.data;
  })
const deleteMessageSlice = createSlice({
  name: 'deleteMessage',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteMessage.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    })
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })
  }
})
export default deleteMessageSlice.reducer;