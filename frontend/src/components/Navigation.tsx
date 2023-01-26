import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Navbar, Nav, Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket, faRightFromBracket ,faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from "@src/store/store"
import { AnyAction } from "@reduxjs/toolkit"
import { useResetAuthStates } from "@src/hooks/useResetStates"
import { logout } from "@src/slices/authSlice"

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
        <NavLink className="navbar-brand" to="/">MyParty - Organize sua Festa</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            {!auth ? (
              <>
                <NavLink className="nav-link" to='/cadastro'><FontAwesomeIcon icon={faFileCirclePlus} /> Cadastrar-se</NavLink>
                <NavLink className="nav-link" to='/login'><FontAwesomeIcon icon={faRightToBracket} /> Login</NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to='/login' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Sair</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
