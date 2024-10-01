import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';


/////////////
const cookies = new Cookies();
let token = ''

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken')
}
//////////////

export const getAllabout = createAsyncThunk(
  'about/getAllabout',
  async () => {
    const response = await axios.get(`${Api}/aboutus`
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })

const getAllaboutSlice = createSlice({
  name: 'getAllabout',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(getAllabout.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(getAllabout.fulfilled, (state, action) => {
      state.data = action.payload;
      // console.log(state.data)

    })
    builder.addCase(getAllabout.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
      // console.log(state.error);
    })

  }



})
export default getAllaboutSlice.reducer;