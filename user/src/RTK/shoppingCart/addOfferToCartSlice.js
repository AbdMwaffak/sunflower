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
export const addOfferToCart = createAsyncThunk(
  'cart/addOfferToCart',
  async (reqobj) => {
    const response = await axios.post(`${Api}/shoppingCart/offers`, reqobj
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })
const addOfferToCartSlice = createSlice({
  name: 'addOfferToCart',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addOfferToCart.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(addOfferToCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    })
    builder.addCase(addOfferToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })
  }
})
export default addOfferToCartSlice.reducer;