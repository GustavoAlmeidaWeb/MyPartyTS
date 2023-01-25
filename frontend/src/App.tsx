import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {

  return (
    <Container fluid>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Container>
    </Container>
  )
}

export default App
