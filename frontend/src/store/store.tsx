import { api } from '@src/utils/config'
import { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import axiosMiddleware from 'redux-axios-middleware'

import authReducer from '@src/slices/authSlice'
import userReducer from '@src/slices/userSlice'
import serviceReducer from '@src/slices/serviceSlice'
import partyReducer from '@src/slices/partySlice'
import addressReducer from '@src/slices/addressSlice'

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    party: partyReducer,
    address: addressReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(thunkMiddleware)
      .concat(axiosMiddleware(api)),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
