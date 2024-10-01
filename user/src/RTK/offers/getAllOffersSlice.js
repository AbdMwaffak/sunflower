import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

/////////////
const cookies = new Cookies();
let token = ''
if (cookies.get('token') !== undefined || null) {
  token = cookies.get('token')
}
//////////////
export const getAllOffers = createAsyncThunk(
  'cart/getAllOffers',
  async () => {
    const response = await axios.get(`${Api}/offers`
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })
const getAllOffersSlice = createSlice({
  name: 'getAllOffers',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOffers.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(getAllOffers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    })
    builder.addCase(getAllOffers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    })
  }
})
export default getAllOffersSlice.reducer;