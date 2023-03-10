import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { useResetAddressStates } from '@src/hooks/useResetStates'
import { getAllAddresses } from '@src/slices/addressSlice'
import NewLoading from '@src/components/NewLoading'

const ListAddresses = (): JSX.Element => {
  const { addresses, loading } = useSelector((state: RootState) => state.address)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetAddressStates(dispatch)

  const limitPage = {
    limit: 10,
    page: 1,
  }

  useEffect(() => {
    dispatch(getAllAddresses(limitPage))
  }, [dispatch])

  console.log(addresses)

  return (
    <>
      <NewLoading load={loading} />
      <div>ListAddresses</div>
    </>
  )
}

export default ListAddresses
