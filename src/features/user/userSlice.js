import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import { loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  isSideBarOpen: false,
}

export const registerUser = createAsyncThunk(
  'user,registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('auth/register', user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('auth/login', user, thunkAPI)
  }
)
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('auth/updateUser', user, thunkAPI)
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen
    },
    logoutUser: (state) => {
      toast.success(`See you soon ${state.user.name}`)
      state.user = null
      state.isSideBarOpen = false
      removeUserFromLocalStorage()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        state.isLoading = false
        addUserToLocalStorage(user)
        toast.success(`Hello ${user.name}`)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        state.isLoading = false
        addUserToLocalStorage(user)
        toast.success(`Welcome back ${user.name}`)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        state.isLoading = false
        addUserToLocalStorage(user)
        toast.success('You have updated your info')
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

//export const actions
export const { toggleSidebar, logoutUser } = userSlice.actions
//export default reducers
export default userSlice.reducer
