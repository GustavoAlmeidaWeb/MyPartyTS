import axios from "axios"
import { RootState } from "@src/store/store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PartyInitialInterface } from "@src/interfaces/IParty"
import partyService from "@src/services/partyService"

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

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})

// Get all parties
export const getAllParties = createAsyncThunk('party/getAll', async (_, thunkAPI) => {

  try {
    const { auth }: RootState = thunkAPI.getState()
    const res = await partyService.getAllParties(auth.user.data.token)
    return res.data

  } catch (e) {

    if (axios.isAxiosError(e)){
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }

})


export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    resetPartyStates: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParty.pending, (state) => {
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
      .addCase(getAllParties.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(getAllParties.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.parties = action.payload
        console.log(action.payload)
      })
      .addCase(getAllParties.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
        state.parties = {}
      })
  },
})

export const { resetPartyStates } = partySlice.actions
export default partySlice.reducer
