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

export const getAllSettings = createAsyncThunk(
  'settings/getAllSettings',
  async () => {
    const response = await axios.get(`${Api}/settings`
      , { headers: { "Authorization": `Bearer ${token}` } })
    console.log(response.data)
    return response.data;
  })

const getAllSettingsSlice = createSlice({
  name: 'getAllSettings',
  initialState:
  {
    data: [],
    status: null,
    error: null,

  },
  extraReducers: (builder) => {
    builder.addCase(getAllSettings.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(getAllSettings.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(getAllSettings.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.payload;
      console.log(state.status);
    })

  }



})
export default getAllSettingsSlice.reducer;