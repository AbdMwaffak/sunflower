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

export const updateCityById = createAsyncThunk(
  'cities/updateCityById',
  async (value) => {
    console.log(value)
    const response = await axios.patch(`${Api}/cities/${value?.id}`, value?.reqobj
      , { headers: { "Authorization": `Bearer ${token}` } })
    // console.log(response.data)
    return response.data;
  })

const updateCityByIdSlice = createSlice({
  name: 'updateCityById',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(updateCityById.pending, (state, action) => {
      state.status = 'loading';

    })
    builder.addCase(updateCityById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'successful';
      state.data = action.payload;
      console.log(action.payload)
      toast.success(JSON.stringify(action.payload));

    })
    builder.addCase(updateCityById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error(JSON.stringify(action.message));
    })

  }



})
export default updateCityByIdSlice.reducer;