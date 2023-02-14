import '@src/assets/css/style.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useAuth } from '@src/hooks/useAuth'

// Components
import Footer from '@src/components/Footer'
import Navigation from '@src/components/Navigation'

// Pages
import Home from '@src/pages/Home/Home'
import Login from '@src/pages/Auth/Login'
import Register from '@src/pages/Auth/Register'
import MyAccount from '@src/pages/MyAccount/MyAccount'
import ListServices from '@src/pages/ListServices/ListServices'
import ListParties from '@src/pages/ListParties/ListParties'
import PartyItem from '@src/pages/ListParties/PartyItem'

function App() {
  const { auth } = useAuth()

  return (
    <>
      <Navigation auth={auth} />
      <Container as="main" className="app" fluid>
        <Container as="section">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/home" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/minha-conta" element={auth ? <MyAccount /> : <Navigate to="/login" />} />
            <Route path="/servicos" element={auth ? <ListServices /> : <Navigate to="/login" />} />
            <Route path="/festas" element={auth ? <ListParties /> : <Navigate to="/login" />} />
            <Route path="/festa/:id" element={auth ? <PartyItem /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/cadastro" element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={auth ? <Home /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default App
