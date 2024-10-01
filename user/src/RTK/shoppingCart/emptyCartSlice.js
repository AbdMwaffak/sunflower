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

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (id) => {
    const response = await axios.patch(`${Api}/shoppingCart/emptyTheBasket`, {}
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })
const emptyCartSlice = createSlice({
  name: 'emptyCart',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(emptyCart.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(emptyCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
      toast.success(JSON.stringify(action.payload));
    })
    builder.addCase(emptyCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })
  }
})
export default emptyCartSlice.reducer;