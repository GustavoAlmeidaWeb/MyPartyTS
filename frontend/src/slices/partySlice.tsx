import axios from 'axios'
import { RootState } from '@src/store/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PartyInitialInterface } from '@src/interfaces/IParty'
import { IPageParams } from '@src/interfaces/IService'
import partyService from '@src/services/partyService'
import { invalidToken } from '@src/utils/helpers'

const initialState = {
  party: {},
  parties: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as PartyInitialInterface

// Get a party
export const getParty = createAsyncThunk('party/get', async (id: string, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await partyService.getParty(id, auth.user.data.token)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get all parties
export const getAllParties = createAsyncThunk('party/getAll', async (params: IPageParams, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await partyService.getAllParties(auth.user.data.token, params)
    console.log(res.data)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get all parties
export const createParty = createAsyncThunk('party/create', async (partyData: FormData, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await partyService.createParty(partyData, auth.user.data.token)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get a party
export const deleteParty = createAsyncThunk('party/delete', async (id: string, thunkAPI) => {
  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await partyService.deleteParty(id, auth.user.data.token)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check if is invalid token
      invalidToken(e)

      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    resetPartyStates: state => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getParty.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getParty.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.party = action.payload
      })
      .addCase(getParty.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.party = {}
      })
      .addCase(getAllParties.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllParties.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.parties = action.payload
      })
      .addCase(getAllParties.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.parties = {}
      })
      .addCase(createParty.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createParty.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.success = true
        state.party = action.payload
        state.message = 'Festa cadastrada com sucesso.'
      })
      .addCase(createParty.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.party = {}
      })
      .addCase(deleteParty.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.success = true
        state.party = action.payload
        state.message = 'Festa excluída com sucesso.'
      })
      .addCase(deleteParty.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetPartyStates } = partySlice.actions
export default partySlice.reducer
