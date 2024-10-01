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
export const getBouquetById = createAsyncThunk(
  'naturalFlowers/getBouquetById',
  async (id) => {
    const response = await axios.get(`${Api}/naturalFlowers/${id}`
      , { headers: { "Authorization": `Bearer ${token}` } })
    console.log(response.data)
    return response.data;
  })
const getBouquetByIdSlice = createSlice({
  name: 'getBouquetById',
  initialState:
  {
    data: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getBouquetById.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(getBouquetById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    })
    builder.addCase(getBouquetById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
    })
  }
})
export default getBouquetByIdSlice.reducer;