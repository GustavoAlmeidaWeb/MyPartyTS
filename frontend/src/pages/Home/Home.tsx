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

import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faToolbox, faChampagneGlasses, faMagnifyingGlass, faPencil, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

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
  <>
    <Col as="section" md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
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
            <h2 className='display-6'>
              Olá, <strong>{user.data.name}</strong>
              <OverlayTrigger placement='top' overlay={<Tooltip>Editar Perfil</Tooltip>}>
                <Link to="/minha-conta" className="btn btn-light"><FontAwesomeIcon icon={faPencil}/></Link>
              </OverlayTrigger>
            </h2>
            <p>Não é você ? <Link className='text-decoration-none' to="/login" onClick={handleLogout}>Sair <FontAwesomeIcon icon={faArrowRightFromBracket}/></Link></p>
          </div>
        </div>
      )}
    </Col>
    <Row as="section" className="py-4">
      <Col className="border p-3 rounded mb-4" sm={{ span: 12 }} md={{ span: 12 }}>
        <h3><FontAwesomeIcon icon={faChampagneGlasses} /> Suas Festas</h3>
        <p>Clique abaixo para ver suas festas cadastradas.</p>
        <Link className="btn btn-warning" to="/festas"><FontAwesomeIcon icon={faMagnifyingGlass}/> Ver suas festas</Link>
      </Col>
      <Col className="border p-3 rounded mb-4" sm={{ span: 12 }} md={{ span: 12 }}>
        <h3><FontAwesomeIcon icon={faToolbox} /> Lista de serviços</h3>
        <p>Clique abaixo para ver a lista de serviços cadastrados.</p>
        <Link className="btn btn-primary" to="/servicos"><FontAwesomeIcon icon={faMagnifyingGlass}/> Ver lista de serviços</Link>
      </Col>
    </Row>
  </>
  )
}

export default Home
