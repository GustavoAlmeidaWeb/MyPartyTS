import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { uploads } from '@src/utils/config'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { getUser } from '@src/slices/userSlice'
import { logout } from '@src/slices/authSlice'
import { RootState } from '@src/store/store'
import { useResetAuthStates } from '@src/hooks/useResetStates'

import { Col } from "react-bootstrap"

import Loading from '@src/components/Loading'

const Home = (): JSX.Element => {

  const { user, loading } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetAuthStates(dispatch)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    resetStates()
  }

  if(loading) {
    return <Loading />
  }

  return (
    <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
      {user.data && (
        <div className='d-flex align-items-center'>
          <div className='w-25'>
            {user.data.image ? (<>
              <img className="w-100 rounded-circle" src={`${uploads}/users/${user.data.image}`} alt={user.data.name} />
            </>) : (<>
              <img className="w-100 rounded-circle" src="https://via.placeholder.com/250" alt={user.data.name} />
            </>)}
          </div>
          <div className='w-75 ps-3'>
            <h2 className='display-6'>Olá, <strong>{user.data.name}</strong></h2>
            <p>Não é você ? <Link className='text-decoration-none' to="/login" onClick={handleLogout}>Clique aqui para sair</Link></p>
          </div>
        </div>
      )}
    </Col>
  )
}

export default Home
