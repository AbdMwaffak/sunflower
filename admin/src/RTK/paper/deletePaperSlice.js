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

export const deletePaper = createAsyncThunk(
    'paper/deletePaper',
    async (id) => {
        const response = await axios.delete(`${Api}/papers/${id}`
            , { headers: { "Authorization": `Bearer ${token}` } })
        // console.log(response.data)
        return response.data;
    })

const deletePaperSlice = createSlice({
    name: 'deletePaper',
    initialState:
    {
        data: [],
        status: null,
        error: null,

    },
    extraReducers: (builder) => {
        builder.addCase(deletePaper.pending, (state, action) => {
            state.status = 'loading';

        })
        builder.addCase(deletePaper.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'successful';
            state.data = action.payload;
            toast.success(JSON.stringify(action.payload));
        })
        builder.addCase(deletePaper.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            toast.error(JSON.stringify(action.error.message))
        })

    }



})
export default deletePaperSlice.reducer;