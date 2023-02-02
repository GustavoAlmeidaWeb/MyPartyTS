import { uploads } from '@src/utils/config'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@src/store/store'
import { deleteUser, getUser, updateUser } from '@src/slices/userSlice'
import { logout } from '@src/slices/authSlice'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { useResetUserStates } from '@src/hooks/useResetStates'

import { Col, Form, FloatingLabel, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons"

import Message from '@src/components/Message'

const MyAccount = (): JSX.Element => {

  const { user, loading, message, error } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetUserStates(dispatch)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<File | Blob | MediaSource>()
  const [changePass, setChangePass] = useState<boolean>(false)
  const [currentPass, setCurrentPass] = useState<string>('')
  const [newPass, setNewPass] = useState<string>('')
  const [confirmPass, setConfirmPass] = useState<string>('')

  // Get user data
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  // Set user data in inputs
  useEffect(() => {
    if(user.data) {
      setName(user.data.name)
      setEmail(user.data.email)
      setPhone(user.data.phone)
      setImg(user.data.image)
    }
  }, [user])

  // Get image from file input change
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    // Image preview
    const img: File | Blob | MediaSource = e.target.files[0]
    setPreviewImage(img)
  }

  // Password change event
  const handleSwitch = (): void => {
    if(changePass) {
      setChangePass(false)
      setCurrentPass('')
      setNewPass('')
      setConfirmPass('')
      document.querySelectorAll('.ipt-password').forEach((ipt, value) => ipt.setAttribute('disabled', ''))
    } else {
      setChangePass(true)
      document.querySelectorAll('.ipt-password').forEach((ipt) => ipt.removeAttribute('disabled'))
    }
  }

  // Get all data and dispatch to update user profile
  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const userData = {
      name,
      phone,
    } as any

    if(previewImage) {
      userData.image = previewImage
    }

    if(changePass) {
      userData.currentpassword = currentPass
      userData.newpassword = newPass
      userData.confirmnewpassword = confirmPass
    }

    const formData: FormData = new FormData()
    Object.keys(userData).forEach((key: string) => formData.append(key, userData[key]))

    await dispatch(updateUser(formData))
    resetStates()
  }

  // Dispatch to delete user account
  const handleDelete = async () => {
    await dispatch(deleteUser())
    dispatch(logout())
    resetStates()
  }

  return (
    <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
      <h2 className='display-4 mb-3 text-center'>Minha Conta</h2>
      <p className="text-center">Se desejar atualize seu perfil.</p>
      <Col className='text-center mb-3'>
        {(previewImage || img) ? (<>
          <img className='rounded w-25' src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${img}`} alt={name} />
        </>) : (<>
          <img className='rounded w-25' src='https://via.placeholder.com/250' alt={name} />
        </>)}
      </Col>
      <Form className="mb-3" onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Trocar imagem de perfil</Form.Label>
          <Form.Control type="file" onChange={handleFile} />
        </Form.Group>
        <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3 text-dark" >
          <Form.Control type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ''} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3 text-dark" >
          <Form.Control type="email" placeholder="E-mail" value={email || ''} disabled/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Telefone" className="mb-3 text-dark" >
          <Form.Control type="text" placeholder="Telefone" onChange={(e) => setPhone(e.target.value)} value={phone || ''} />
        </FloatingLabel>
        <Form.Group className='d-flex align-items-center my-4'>
          <h3 className='h4'>Deseja alterar sua senha ?</h3>
          <Form.Check className='ms-2' type="switch" id="custom-switch" onChange={handleSwitch} />
        </Form.Group>
        <FloatingLabel controlId="floatingInput" label="Senha atual" className="mb-3 text-dark" >
          <Form.Control className="ipt-password" type="password" placeholder="Senha atual" onChange={(e) => setCurrentPass(e.target.value)} value={currentPass || ''} disabled />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Nova senha" className="mb-3 text-dark" >
          <Form.Control className="ipt-password" type="password" placeholder="Nova senha" onChange={(e) => setNewPass(e.target.value)} value={newPass || ''} disabled />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Confirmar nova senha" className="mb-3 text-dark" >
          <Form.Control className="ipt-password" type="password" placeholder="Confirmar nova senha" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass || ''} disabled />
        </FloatingLabel>
        {!loading && (
          <Form.Group className="d-flex justify-content-between">
            <Button type="button" variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /> Excluir conta</Button>
            <Button variant="primary" type="submit"><FontAwesomeIcon icon={faPenToSquare} /> Atualizar Conta</Button>
          </Form.Group>
        )}
        {loading && (
          <Form.Group className="d-flex justify-content-between">
            <Button type="button" variant="danger" onClick={handleDelete} disabled >Aguarde</Button>
            <Button variant="primary" type="submit" disabled >Aguarde</Button>
          </Form.Group>
        )}
      </Form>
      {message && <Message type="success" msg={message} />}
      {error && <Message type="danger" msg={error} />}
    </Col>
  )
}

export default MyAccount
