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

export const replyMessage = createAsyncThunk(
  'message/replyMessage',
  async (reqobj) => {
    const response = await axios.post(`${Api}/messages/reply/${reqobj?.id}`, reqobj.value
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })

const replyMessageSlice = createSlice({
  name: 'replyMessage',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(replyMessage.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(replyMessage.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    })
    builder.addCase(replyMessage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })

  }



})
export default replyMessageSlice.reducer;