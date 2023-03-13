import { useState, useEffect, FormEvent, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { getInfoByCep } from '@src/slices/addressSlice'
import { IAddressCreate } from '@src/interfaces/IAddress'
import Message from '@src/components/Message'

type Props = {
  show: boolean
  hide: () => void
  handleSubmit: (data: IAddressCreate) => Promise<void>
}

const AddAddress = ({ show, hide, handleSubmit }: Props) => {
  const { address, error, success } = useSelector((state: RootState) => state.address)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  const [name, setName] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [zipcode, setZipcode] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [adjunt, setAdjunt] = useState<string>('')
  const [map, setMap] = useState<string>('')

  useEffect(() => {
    if (address && address.data) {
      setZipcode(address.data.cep)
      setStreet(address.data.logradouro)
      setNeighborhood(address.data.bairro)
      setCity(address.data.municipio)
      setProvince(address.data.uf)
    }
  }, [address])

  useEffect(() => {
    cleanInputs()
  }, [success])

  const cleanInputs = () => {
    setName('')
    setCity('')
    setNeighborhood('')
    setProvince('')
    setStreet('')
    setZipcode('')
    setNumber('')
    setAdjunt('')
    setMap('')
  }

  const handleData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const addressData = {
      name,
      city,
      neighborhood,
      province,
      street,
      zipcode,
      number,
      adjunt,
      map,
    } as IAddressCreate

    handleSubmit(addressData)
  }

  const getInfoCep = async () => {
    if (zipcode.length >= 8 && zipcode.length < 10) {
      await dispatch(getInfoByCep(zipcode))
    }
  }

  const handleClose = () => {
    hide()
    cleanInputs()
  }

  return (
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-70w">
      <Modal.Header closeButton>
        <Modal.Title as="h3">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Adicionar Endereço
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleData}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Endereço - 'Ex. Casa'</Form.Label>
            <Form.Control type="text" value={name || ''} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              maxLength={9}
              type="text"
              value={zipcode || ''}
              onChange={e => setZipcode(e.target.value)}
              onDoubleClick={getInfoCep}
            />
          </Form.Group>
          {error && <Message msg={error} type="danger" />}
          <Form.Group className="mb-3">
            <Form.Label>Rua</Form.Label>
            <Form.Control type="text" value={street || ''} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Número</Form.Label>
            <Form.Control type="text" value={number || ''} onChange={e => setNumber(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text" value={adjunt || ''} onChange={e => setAdjunt(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bairro</Form.Label>
            <Form.Control type="text" value={neighborhood || ''} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" value={city || ''} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" value={province || ''} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mapa do Google</Form.Label>
            <Form.Control as="textarea" rows={3} value={map || ''} onChange={e => setMap(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            <FontAwesomeIcon icon={faXmark} /> Fechar
          </Button>
          <Button type="submit" variant="primary">
            <FontAwesomeIcon icon={faFileCirclePlus} /> Cadastrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddAddress
