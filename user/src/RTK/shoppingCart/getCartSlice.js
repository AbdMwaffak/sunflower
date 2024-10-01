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
export const getCart = createAsyncThunk(
  'cart/getCart',
  async () => {
    const response = await axios.get(`${Api}/shoppingCart`
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })
const getCartSlice = createSlice({
  name: 'getCart',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(getCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    })
  }
})
export default getCartSlice.reducer;