import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Api from '../../allExtensions/API';

export const postLogin = createAsyncThunk(
  'auth/postLogin',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/users/login`, userCredentials);
      return response.data;
    } catch (error1) {
      return rejectWithValue(error1.response.data);
    }
  }
);
export const postLoginSlice = createSlice({
  name: 'postLogin',
  initialState: {
    data1: [],
    loading1: false,
    error1: null,
  },
  reducers: {
    back1: (state) => {
      state.data1 = [];
      state.error1 = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.loading1 = false;
      state.data1 = action.payload;
      // const cookies = new Cookies();
      // cookies.set("token", state.data1.token, { path: '/', expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000), secure: true, sameSite: 'Strict' })
      // cookies.set("userId", state.data1?.user?._id, { path: '/', expires: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000), secure: true, sameSite: 'Strict' })
      // window.location.state = false
      // window.location.pathname = '/'
    });
    builder.addCase(postLogin.pending, (state, action) => {
      state.loading1 = true;
      state.error1 = null;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.loading1 = false;
      state.data1 = [];
      state.error1 = action.payload;
    });
  },
});
export const { back1 } = postLoginSlice.actions;
export default postLoginSlice.reducer;

// // authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // إنشاء Async Thunk لتسجيل الدخول
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (userCredentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/api/login', userCredentials);
//       return response.data; // البيانات التي ترجع من السيرفر
//     } catch (error) {
//       return rejectWithValue(error.response.data); // إرجاع الخطأ من السيرفر
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload; // تخزين بيانات المستخدم
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // تخزين الخطأ
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
