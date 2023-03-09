import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploads } from '@src/utils/config'
import { RootState } from '@src/store/store'
import { Modal, Button, Form, Col, Table, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTriangleExclamation, faArrowPointer } from '@fortawesome/free-solid-svg-icons'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { getAllServices } from '@src/slices/serviceSlice'
import { IPartyCreate } from '@src/interfaces/IParty'
import { IServiceCreate } from '@src/interfaces/IService'
import { formatMoney } from '@src/utils/helpers'
import Message from '@src/components/Message'
import { Link } from 'react-router-dom'

type Props = {
  show: boolean
  editParty: boolean
  hide: () => void
  handleSubmit: (data: IPartyCreate, service: any) => void
}

const AddParty = ({ show, hide, editParty, handleSubmit }: Props) => {
  const { error, success } = useSelector((state: RootState) => state.party)
  const { services } = useSelector((state: RootState) => state.service)
  // const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  const [imagePreview, setImagePreview] = useState<File | Blob | MediaSource>()
  const [image, setImage] = useState<string>('')
  const [imageError, setImageError] = useState<string>(null)
  const [title, setTitle] = useState<string>('')
  const [budget, setBudget] = useState<number>()
  const [description, setDescription] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>('')
  const [eventHour, setEventHour] = useState<string>('')
  const [servicesArr, setServicesArr] = useState<any>([])
  const [partyServices, setPartyServices] = useState<any>([])

  useEffect(() => {
    cleanInputs()
  }, [success])
  // useEffect(() => {
  //   dispatch(getAllServices({ limit: 50, page: 1 }))
  // }, [dispatch])

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

  const cleanInputs = (): void => {
    setTitle('')
    setDescription('')
    setAuthor('')
    setEventDate('')
    setEventHour('')
    setBudget(0)
    setImagePreview(null)
    setPartyServices([])
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files[0].size > 3000000) {
      setImageError('O tamanho de imagem máximo permitido é de 3MB.')
      setImagePreview(null)
      setTimeout(() => {
        setImageError(null)
      }, 3500)
    } else {
      setImagePreview(e.target.files[0])
    }
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
    <Modal show={show} onHide={hide} size="xl">
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
          {imageError && <Message type="danger" msg={imageError} />}
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
          {services && services.data && services.data.length > 0 ? (
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="w-100-px text-center">Imagem</th>
                  <th className="ps-3">Nome</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {services.data.map((service: any) => (
                  <tr key={service._id}>
                    <td className="text-center">
                      <Form.Check type="checkbox" onChange={e => handleServices(e)} value={service._id} />
                    </td>
                    <td className="text-center">
                      {service.image ? (
                        <img
                          className="rounded-circle service-img-thumb"
                          src={`${uploads}/services/${service.image}`}
                          alt={service.name}
                        />
                      ) : (
                        <img
                          className="rounded-circle service-img-thumb"
                          src="https://via.placeholder.com/150"
                          alt={service.name}
                        />
                      )}
                    </td>
                    <td className="ps-3">{service.name}</td>
                    <td>{formatMoney(service.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Col>
              <Alert variant="warning">
                <Alert.Heading className="h5">
                  <FontAwesomeIcon className="me-2" icon={faTriangleExclamation} />
                  Atenção, nenhum fornecedor cadastrado.
                </Alert.Heading>
                <p>Para que o cadastro da festa seja realizado com sucesso, é necessário que serviços sejam cadastrados antes.</p>
                <hr />
                <Link to="/servicos" className="text-decoration-none alert-link">
                  Clique aqui
                  <FontAwesomeIcon className="ms-2" icon={faArrowPointer} />
                </Link>
              </Alert>
            </Col>
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
