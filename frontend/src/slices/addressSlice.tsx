import axios from 'axios'
import { IPageParams } from '@src/interfaces/IService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AddressInitialInterface, IAddressCreate } from '@src/interfaces/IAddress'
import addressServices from '@src/services/addressService'

const initialState = {
  address: {},
  addresses: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as AddressInitialInterface

// Create new address
export const createAddress = createAsyncThunk('address/create', async (addressData: IAddressCreate, thunkAPI) => {
  try {
    const res = await addressServices.createAddressService(addressData)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get address
export const getAddress = createAsyncThunk('address/get', async (id: string, thunkAPI) => {
  try {
    const res = await addressServices.findAddressService(id)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get all addresses
export const getAllAddresses = createAsyncThunk('address/getAll', async (params: IPageParams, thunkAPI) => {
  try {
    const res = await addressServices.findAllAddressesService(params)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get info by CEP
export const getInfoByCep = createAsyncThunk('address/cep', async (cep: string, thunkAPI) => {
  try {
    const res = await addressServices.getAddressByCep(cep)
    return res
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
})

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    resetAddressStates: state => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createAddress.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.success = true
        state.address = action.payload
        state.message = 'Endereço cadastrado com sucesso.'
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.address = {}
      })
      .addCase(getAddress.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.address = action.payload
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.address = {}
      })
      .addCase(getAllAddresses.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.addresses = action.payload
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.addresses = {}
      })
      .addCase(getInfoByCep.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getInfoByCep.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.address = action.payload
      })
      .addCase(getInfoByCep.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.address = {}
      })
  },
})

export const { resetAddressStates } = addressSlice.actions
export default addressSlice.reducer
