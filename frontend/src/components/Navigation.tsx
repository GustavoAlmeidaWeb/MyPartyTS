import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@src/store/store'
import { AnyAction } from '@reduxjs/toolkit'
import { useResetAuthStates } from '@src/hooks/useResetStates'
import { logout } from '@src/slices/authSlice'
import {
  faRightToBracket,
  faRightFromBracket,
  faFileCirclePlus,
  faUser,
  faChampagneGlasses,
  faLocationDot,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  auth: boolean
}

const Navigation = ({ auth }: Props): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetAuthStates(dispatch)

  const handleLogout = (): void => {
    dispatch(logout())
    resetStates()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <NavLink className="navbar-brand" to="/">
          MyParty - Organize sua Festa
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            {!auth ? (
              <>
                <NavLink className="nav-link" to="/cadastro">
                  <FontAwesomeIcon icon={faFileCirclePlus} /> Cadastrar-se
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/festas">
                  <FontAwesomeIcon icon={faChampagneGlasses} /> Festas
                </NavLink>
                <NavLink className="nav-link" to="/servicos">
                  <FontAwesomeIcon icon={faBriefcase} /> Fornecedores
                </NavLink>
                <NavLink className="nav-link" to="/enderecos">
                  <FontAwesomeIcon icon={faLocationDot} /> Endereços
                </NavLink>
                <NavLink className="nav-link" to="/minha-conta">
                  <FontAwesomeIcon icon={faUser} /> Minha conta
                </NavLink>
                <NavLink className="nav-link" to="/login" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Sair
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
