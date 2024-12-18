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

export const patchChocolate = createAsyncThunk(
  'chocolate/patchChocolate',
  async (value) => {
    const response = await axios.patch(`${Api}/chocolate/${value.id}`, value.reqobj
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })

const patchChocolateSlice = createSlice({
  name: 'patchChocolate',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(patchChocolate.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(patchChocolate.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));
    })
    builder.addCase(patchChocolate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })

  }



})
export default patchChocolateSlice.reducer;