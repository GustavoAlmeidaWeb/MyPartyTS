import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthInitialType, LoginType, RegisterType } from '../@types/UserTypes'
import { IUserLogin, IUserRegister } from '../interfaces/IUser'
import authService from '../services/authService'

const user = { data: JSON.parse(localStorage.getItem('myparty'))};

const initialState = {
    user: user || {},
    error: null,
    success: false,
    loading: false,
    message: null,
} as AuthInitialType

// Register an user
export const register = createAsyncThunk('auth/register', async (user: RegisterType, thunkAPI) => {

  try {

    const res: IUserRegister = await authService.register(user)

    if(res.data.token) {
      localStorage.setItem('myparty', JSON.stringify({token: res.data.token}))
    }

    return res

  } catch (e) {

    if (axios.isAxiosError(e)){

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})

// Login an user
export const login = createAsyncThunk('auth/login', async (user: LoginType, thunkAPI) => {

  try {

    const res: IUserLogin = await authService.login(user)

    if(res.data.token) {
      localStorage.setItem('myparty', JSON.stringify(res.data))
    }

    return res

  } catch (e) {

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }

  }

})

// logout
export const logout = createAsyncThunk('auth/logout', async (): Promise<void> => {

  await authService.logout()

})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      resetAuthStates: (state) => {
        state.loading = false
        state.error = null
        state.success = false
        state.message = null
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
        state.message = 'Cadastro realizado com sucesso'
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.user = {}
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
        state.message = 'Login realizado com sucesso.';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = {}
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = {}
      })
  },
});

export const { resetAuthStates } = authSlice.actions
export default authSlice.reducer
