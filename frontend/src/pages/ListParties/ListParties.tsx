import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store/store"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { getAllParties, getParty } from "@src/slices/partySlice"
import Loading from "@src/components/Loading"

const ListParties = (): JSX.Element => {

  const { party, parties, loading } = useSelector((state: RootState) => state.party)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  useEffect(() => {
    dispatch(getAllParties())
    dispatch(getParty('63c6a7afc225982814a663b1'))
  }, [dispatch])

  if(loading) {
    return <Loading />
  }

  // console.log(parties)
  // console.log(party)

  return (
    <div>ListParties</div>
  )
}

export default ListParties
