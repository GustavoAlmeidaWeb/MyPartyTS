import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { getAllServices } from "@src/slices/serviceSlice"
import { RootState } from "@src/store/store"
import { ThunkDispatch } from "redux-thunk"
import Loading from "@src/components/Loading"

const ListServices = (): JSX.Element => {

  const { services, loading } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  useEffect(() => {
    dispatch(getAllServices())
  }, [dispatch])

  if(loading) {
    return <Loading />
  }

  return (
    <div>ListServices</div>
  )
}

export default ListServices
