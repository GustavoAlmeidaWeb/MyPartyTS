import axios from "axios"
import { RootState } from "@src/store/store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IPageParams, IServiceDataForm, ServiceInitialInterface } from "@src/interfaces/IService"
import serviceService from "@src/services/serviceService"

const initialState = {
  service: {},
  services: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as ServiceInitialInterface

// Get a service
export const getService = createAsyncThunk('service/get', async (id: string, thunkAPI) => {

  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await serviceService.getService(id, auth.user.data.token)
    return res.data

  } catch (e) {

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})

// Get all services
export const getAllServices = createAsyncThunk('service/getAll', async (params: IPageParams, thunkAPI) => {

  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await serviceService.getAllServices(auth.user.data.token, params)
    return res.data

  } catch (e) {

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})

// Create a service
export const createService = createAsyncThunk('service/create', async (serviceData: FormData, thunkAPI) => {

  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await serviceService.createService(serviceData, auth.user.data.token)
    return res.data

  } catch (e) {

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})


export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    resetServiceStates: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.service = action.payload
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.service = {}
      })
      .addCase(getAllServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.services = {}
      })
      .addCase(createService.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.service = action.payload
        state.message = 'Serviço criado com sucesso.'
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
  },
})

export const { resetServiceStates } = serviceSlice.actions
export default serviceSlice.reducer
