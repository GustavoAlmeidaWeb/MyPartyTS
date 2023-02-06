import { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import authReducer from '@src/slices/authSlice'
import userReducer from '@src/slices/userSlice'
import serviceReducer from '@src/slices/serviceSlice'
import partyReducer from '@src/slices/partySlice'

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    party: partyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
