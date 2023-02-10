import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploads } from '@src/utils/config'
import { RootState } from '@src/store/store'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { getAllServices } from '@src/slices/serviceSlice'
import Message from '@src/components/Message'
import { IPartyCreate } from '@src/interfaces/IParty'
import { IServiceCreate } from '@src/interfaces/IService'

type Props = {
  show: boolean
  editParty: boolean
  hide: () => void
  handleSubmit: (data: IPartyCreate, service: any) => void
}

const AddParty = ({ show, hide, editParty, handleSubmit }: Props) => {
  const { error } = useSelector((state: RootState) => state.party)
  const { services } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  const [imagePreview, setImagePreview] = useState<File | Blob | MediaSource>()
  const [image, setImage] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [budget, setBudget] = useState<number>()
  const [description, setDescription] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>('')
  const [eventHour, setEventHour] = useState<string>('')
  const [servicesArr, setServicesArr] = useState<any>([])
  const [partyServices, setPartyServices] = useState<any>([])

  useEffect(() => {
    dispatch(getAllServices({ limit: 50, page: 1 }))
  }, [dispatch])

  useEffect(() => {
    if (services.data) {
      setServicesArr(services.data)
    }
  }, [services.data])

  const handleData = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const partyData = {
      title,
      author,
      description,
      budget,
      date: eventDate,
      hour: eventHour,
    } as IPartyCreate

    if (imagePreview) {
      partyData.image = imagePreview
    }
    handleSubmit(partyData, partyServices)
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    setImagePreview(e.target.files[0])
  }

  const handleServices = (e: ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked
    const value = e.target.value

    const filterService = servicesArr.filter((s: any) => s._id === value)

    if (checked) {
      setPartyServices((service: IServiceCreate[]) => [...service, filterService[0]])
    } else {
      setPartyServices((service: IServiceCreate[]) => service.filter((s: any) => s._id !== value))
    }
  }

  return (
    <Modal show={show} onHide={hide} dialogClassName="modal-70w">
      <Modal.Header closeButton>
        <Modal.Title as="h3">Nova Festa</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleData}>
        <Modal.Body>
          <Col className="text-center mb-3">
            {!editParty && (
              <>
                {imagePreview ? (
                  <img className="rounded w-25" src={URL.createObjectURL(imagePreview)} alt={title} />
                ) : (
                  <img className="rounded w-25" src="https://via.placeholder.com/250" alt={title} />
                )}
              </>
            )}
            {editParty && (
              <>
                {!imagePreview ? (
                  <>
                    {image ? (
                      <img className="rounded w-25" src={`${uploads}/services/${image}`} alt={title} />
                    ) : (
                      <img className="rounded w-25" src="https://via.placeholder.com/250" alt={title} />
                    )}
                  </>
                ) : (
                  <img className="rounded w-25" src={URL.createObjectURL(imagePreview)} alt={title} />
                )}
              </>
            )}
          </Col>
          <Form.Group className="mb-3">
            <Form.Label>Imagem da Festa</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Título da festa</Form.Label>
            <Form.Control type="text" value={title || ''} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={3} value={description || ''} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Produtor da festa</Form.Label>
            <Form.Control type="text" value={author || ''} onChange={e => setAuthor(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget da Festa</Form.Label>
            <Form.Control type="number" value={budget || ''} onChange={e => setBudget(Number(e.target.value))} />
          </Form.Group>
          {services && services.data && services.data.length > 0 && (
            <Form.Group className="mb-3">
              {services.data.map((service: any) => (
                <Form.Check
                  type="checkbox"
                  onChange={e => handleServices(e)}
                  value={service._id}
                  label={service.name}
                  key={service._id}
                />
              ))}
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Data do Evento</Form.Label>
            <Form.Control
              type="date"
              value={eventDate || ''}
              onChange={e => setEventDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hora do Evento</Form.Label>
            <Form.Control type="time" value={eventHour || ''} onChange={e => setEventHour(e.target.value)} />
          </Form.Group>
          {error && <Message type="danger" msg={error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            <FontAwesomeIcon icon={faXmark} /> Fechar
          </Button>
          <Button type="submit" variant="primary">
            Cadastrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddParty
