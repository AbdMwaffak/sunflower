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
export const getOffersById = createAsyncThunk(
  'cart/getOffersById',
  async (id) => {
    const response = await axios.get(`${Api}/offers/${id}`
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })
const getOffersByIdSlice = createSlice({
  name: 'getOffersById',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getOffersById.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(getOffersById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    })
    builder.addCase(getOffersById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    })
  }
})
export default getOffersByIdSlice.reducer;