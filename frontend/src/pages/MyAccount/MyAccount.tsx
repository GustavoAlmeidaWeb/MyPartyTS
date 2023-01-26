import { Link } from 'react-router-dom'
import { uploads } from '@src/utils/config'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@src/store/store'
import { getUser, updateUser } from '@src/slices/userSlice'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { useResetUserStates } from '@src/hooks/useResetStates'

import { Col, Form, FloatingLabel, Button } from "react-bootstrap"

import Loading from '@src/components/Loading'
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

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    if(user.data) {
      setName(user.data.name)
      setEmail(user.data.email)
      setPhone(user.data.phone)
      setImg(user.data.image)
    }
  }, [user.data])

  console.log(user)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    // Image preview
    const img: File | Blob | MediaSource = e.target.files[0]
    setPreviewImage(img)
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const userData = {
      name,
      phone,
    } as any

    if(previewImage) {
      userData.image = previewImage
    }

    const formData: FormData = new FormData()
    Object.keys(userData).forEach((key: string) => formData.append(key, userData[key]))

    await dispatch(updateUser(formData))
    resetStates()
  }

  if(loading || user === null) {
    return <Loading />
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
        {!loading && <Button className="w-100" variant="primary" size="lg" type="submit">Atualizar</Button>}
        {loading && <Button className="w-100" variant="primary" size="lg" type="submit" disabled>Aguarde</Button>}
      </Form>
      {message && <Message type="success" msg={message} />}
      {error && <Message type="danger" msg={error} />}
    </Col>
  )
}

export default MyAccount
