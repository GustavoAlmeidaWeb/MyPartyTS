import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@src/store/store'
import { AnyAction } from '@reduxjs/toolkit'
import { getParty } from '@src/slices/partySlice'
import Loading from '@src/components/Loading'

type Props = {}

const PartyItem = (props: Props) => {

  const { party, loading } = useSelector((state: RootState) => state.party)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getParty(id))
  }, [id])

  console.log(party)

  if(loading) {
    return <Loading />
  }

  return (
    <div>PartyItem</div>
  )
}

export default PartyItem
