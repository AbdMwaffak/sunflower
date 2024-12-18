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

export const postBouquet = createAsyncThunk(
    'naturalFlowers/postBouquet',
    async (reqobj) => {
        const response = await axios.post(`${Api}/naturalFlowers`, reqobj
            , { headers: { "Authorization": `Bearer ${token}` } }
        )
        // console.log(response.data)
        return response.data;
    })

const postBouquetSlice = createSlice({
    name: 'postBouquet',
    initialState:
    {
        data: [],
        status: null,
        error: null,

    },
    extraReducers: (builder) => {
        builder.addCase(postBouquet.pending, (state, action) => {
            state.status = 'loading';

        })
        builder.addCase(postBouquet.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'successful';
            state.data = action.payload;
            toast.success(JSON.stringify(action.payload));
        })
        builder.addCase(postBouquet.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            toast.error(JSON.stringify(action.error.message))
        })

    }



})
export default postBouquetSlice.reducer;