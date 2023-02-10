import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@src/store/store'
import { register } from '@src/slices/authSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { RegisterType } from '@src/@types/UserTypes'
import { useResetAuthStates } from '@src/hooks/useResetStates'
import { showPassword } from '@src/hooks/useShowPass'

import { Col, FloatingLabel, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

import Message from '@src/components/Message'
import NewLoading from '@src/components/NewLoading'

const Register = (): JSX.Element => {
  const { error, message, loading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetAuthStates(dispatch)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmpassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const user = {
      name,
      email,
      phone,
      password,
      confirmpassword,
    } as RegisterType

    await dispatch(register(user))
    resetStates()
  }

  return (
    <>
      <NewLoading load={loading} />
      <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
        <h2 className="display-4 mb-3 text-center">Crie seu perfil</h2>
        <p className="text-center">Preencha os campos abaixo para criar seu perfil.</p>
        <Form className="mb-3" onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3 text-dark">
            <Form.Control type="text" placeholder="Nome" onChange={e => setName(e.target.value)} value={name || ''} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3 text-dark">
            <Form.Control type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email || ''} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Telefone" className="mb-3 text-dark">
            <Form.Control type="text" placeholder="Telefone" onChange={e => setPhone(e.target.value)} value={phone || ''} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Senha" className="mb-3 text-dark">
            <Form.Control
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
              value={password || ''}
            />
            <button
              type="button"
              onClick={() => showPassword('btn-show-password', 'floatingPassword')}
              className="position-absolute btn btn-show-password text-primary"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPasswordConfirm" label="Confirmação de Senha" className="mb-3 text-dark">
            <Form.Control
              type="password"
              placeholder="Confirmação de Senha"
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmpassword || ''}
            />
            <button
              type="button"
              onClick={() => showPassword('btn-show-password-confirm', 'floatingPasswordConfirm')}
              className="position-absolute btn btn-show-password-confirm text-primary"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </FloatingLabel>
          {!loading && (
            <Button className="w-100" variant="primary" size="lg" type="submit">
              Entrar
            </Button>
          )}
          {loading && (
            <Button className="w-100" variant="primary" size="lg" type="submit" disabled>
              Aguarde
            </Button>
          )}
          <p className="text-center mt-2">
            Já tem seu cadastro ?{' '}
            <Link className="text-decoration-none" to="/login">
              Faça o login
            </Link>
          </p>
        </Form>
        {message && <Message type="success" msg={message} />}
        {error && <Message type="danger" msg={error} />}
      </Col>
    </>
  )
}

export default Register
