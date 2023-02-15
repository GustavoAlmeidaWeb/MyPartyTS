import axios from 'axios'
import userService from '@src/services/userService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthInitialType } from '@src/@types/UserTypes'
import { RootState } from '@src/store/store'
import { invalidToken } from '@src/utils/helpers'

const initialState = {
  user: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as AuthInitialType

// Get current user
export const getUser = createAsyncThunk('user/get', async (_, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await userService.getUser(auth.user.data.token)
    return res
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Update user
export const updateUser = createAsyncThunk('user/update', async (userData: FormData, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await userService.updateUser(auth.user.data.token, userData)
    return res
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Delete user
export const deleteUser = createAsyncThunk('user/delete', async (_, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await userService.deleteUser(auth.user.data.token)
    return res
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserStates: state => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.user = {}
      })
      .addCase(updateUser.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
        state.message = 'Perfil atualizado com sucesso.'
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(deleteUser.fulfilled, state => {
        state.loading = false
        state.success = true
        state.error = null
        state.message = 'Perfil excluído com sucesso.'
        state.user = {}
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
  },
})

export const { resetUserStates } = userSlice.actions
export default userSlice.reducer
