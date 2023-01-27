import "@src/assets/css/login.css"
import { Link } from "react-router-dom"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { Col, Form, Button, FloatingLabel } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { login } from "@src/slices/authSlice"
import { RootState } from "@src/store/store"
import { LoginType } from "@src/@types/UserTypes"
import { useResetAuthStates } from "@src/hooks/useResetStates"
import Loading from "@src/components/Loading"
import Message from "@src/components/Message"

const Login = (): JSX.Element => {

  const { loading, error, message } = useSelector((state: RootState) => state.auth)
  const { error: error_user, message: msg_user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetMessage = useResetAuthStates(dispatch)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const user = {
      email,
      password,
    } as LoginType

    dispatch(login(user))
    resetMessage()
  }

  if(loading) {
    return <Loading />
  }

  return (
    <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
      <h2 className='display-4 mb-3 text-center'>Faça seu Login</h2>
      <p className="text-center">Faça seu login e organize sua festa.</p>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3 text-dark" >
          <Form.Control type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ''} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Senha" className="mb-3 text-dark" >
          <Form.Control type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
          <button type="button" className="position-absolute btn btn-show-password text-primary"><FontAwesomeIcon icon={faEye} /></button>
        </FloatingLabel>
        {!loading && <Button className="w-100" variant="primary" size="lg" type="submit">Entrar</Button>}
        {loading && <Button className="w-100" variant="primary" size="lg" type="submit" disabled>Aguarde</Button>}
        <p className="text-center mt-2">Não tem seu cadastro ainda ? <Link className="text-decoration-none" to='/cadastro'>Cadastre-se</Link></p>
      </Form>
      {message && <Message type="success" msg={message} />}
      {error && <Message type="danger" msg={error} />}
      {msg_user && <Message type="success" msg={msg_user} />}
      {error_user && <Message type="danger" msg={error_user} />}
    </Col>
  )
}

export default Login
