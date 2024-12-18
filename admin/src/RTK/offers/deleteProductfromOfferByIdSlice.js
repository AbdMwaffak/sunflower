import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';


/////////////
const cookies = new Cookies();
let token = ''

if (cookies.get('adminToken') !== undefined || null) {
  token = cookies.get('adminToken')
}
//////////////

export const deleteProductfromOfferById = createAsyncThunk(
  'offers/deleteProductfromOfferById',
  async (value) => {
    const response = await axios.delete(`${Api}/offers/${value.offerId}/products/${value.productId}`
      , {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    // console.log(response.data)
    return response.data;
  })

const deleteProductfromOfferByIdSlice = createSlice({
  name: 'deleteProductfromOfferById',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(deleteProductfromOfferById.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(deleteProductfromOfferById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      toast.success(JSON.stringify(action.payload));

    })
    builder.addCase(deleteProductfromOfferById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.error.message))
    })

  }



})
export default deleteProductfromOfferByIdSlice.reducer;