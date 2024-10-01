import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Api from '../../allExtensions/API'

export const postLogin = createAsyncThunk(
    'auth/postLogin', async (reqobj) => {
        const response = await axios.post(`${Api}/users/login`, reqobj)
        // console.log(response.data)
        return response.data
    }
)

export const postLoginSlice = createSlice({

    name: 'postLogin',
    initialState:
    {
        data: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'success';
            const cookies = new Cookies();
            cookies.set("token", state.data.token)
            window.location.state = false
            window.location.pathname = '/'
        })
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.payload;
        })
    },
})
export default postLoginSlice.reducer
