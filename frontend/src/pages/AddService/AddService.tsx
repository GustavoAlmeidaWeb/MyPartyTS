import { uploads } from '@src/utils/config'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { IServiceDataForm } from '@src/interfaces/IService'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { AnyAction } from '@reduxjs/toolkit'
import { getService } from '@src/slices/serviceSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import Message from '@src/components/Message'

type Props = {
  show: boolean
  edit: boolean
  serviceId?: string
  hide: () => void
  handleSubmit: (data: IServiceDataForm) => void
  handleUpdate: (data: IServiceDataForm) => void
}

const AddService = ({
  show,
  hide,
  handleSubmit,
  handleUpdate,
  edit,
  serviceId,
}: Props) => {
  const { service, error, success } = useSelector(
    (state: RootState) => state.service,
  )
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<File | Blob | MediaSource>()

  useEffect(() => {
    cleanInputs()
  }, [success])

  useEffect(() => {
    if (edit) {
      dispatch(getService(serviceId))
    } else {
      cleanInputs()
    }
  }, [edit])

  useEffect(() => {
    if (service && edit) {
      setName(service.name)
      setDescription(service.description)
      setPrice(service.price)
      setImage(service.image)
    }
  }, [service])

  const cleanInputs = (): void => {
    setName('')
    setDescription('')
    setPrice('')
    setImagePreview(null)
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const img: File | Blob | MediaSource = e.target.files[0]
    setImagePreview(img)
  }

  const handleData = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const serviceData = {
      name,
      description,
      price: Number(price),
    } as IServiceDataForm

    if (imagePreview) {
      serviceData.image = imagePreview
    }

    if (edit) {
      serviceData._id = serviceId
      handleUpdate(serviceData)
    } else {
      handleSubmit(serviceData)
    }
  }

  return (
    <Modal show={show} onHide={hide} dialogClassName="modal-70w">
      <Modal.Header closeButton>
        <Modal.Title as="h3">
          {!edit ? 'Adicionar Serviço' : 'Atualizar Serviço'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleData}>
        <Modal.Body>
          <Col className="text-center mb-3">
            {!edit && (
              <>
                {imagePreview ? (
                  <img
                    className="rounded w-25"
                    src={URL.createObjectURL(imagePreview)}
                    alt={name}
                  />
                ) : (
                  <img
                    className="rounded w-25"
                    src="https://via.placeholder.com/250"
                    alt={name}
                  />
                )}
              </>
            )}
            {edit && (
              <>
                {!imagePreview ? (
                  <>
                    {image ? (
                      <img
                        className="rounded w-25"
                        src={`${uploads}/services/${image}`}
                        alt={name}
                      />
                    ) : (
                      <img
                        className="rounded w-25"
                        src="https://via.placeholder.com/250"
                        alt={name}
                      />
                    )}
                  </>
                ) : (
                  <img
                    className="rounded w-25"
                    src={URL.createObjectURL(imagePreview)}
                    alt={name}
                  />
                )}
              </>
            )}
          </Col>
          <Form.Group className="mb-3">
            <Form.Label>Imagem do serviço</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome do serviço</Form.Label>
            <Form.Control
              type="text"
              value={name || ''}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description || ''}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              value={price || ''}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
          {error && <Message type="danger" msg={error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            <FontAwesomeIcon icon={faXmark} /> Fechar
          </Button>
          <Button type="submit" variant="primary">
            {!edit ? (
              <>
                <FontAwesomeIcon icon={faFileCirclePlus} /> Cadastrar
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSquareCheck} /> Atualizar
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddService
