import Message from "@src/components/Message"
import { IServiceDataForm } from "@src/interfaces/IService"
import { RootState } from "@src/store/store"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Modal, Button, Form, Col } from "react-bootstrap"
import { useSelector } from "react-redux"

type Props = {
  show: boolean
  hide: () => void
  handleSubmit: (data: IServiceDataForm) => void
}

const AddService = ({ show, hide, handleSubmit }: Props) => {

  const { error, success } = useSelector((state: RootState) => state.service)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>()
  const [imagePreview, setImagePreview] = useState<File | Blob | MediaSource>()

  useEffect(() => {
    setName('')
    setDescription('')
    setPrice('')
    setImagePreview(null)
  }, [success])

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

    if(imagePreview) {
      serviceData.image = imagePreview
    }

    handleSubmit(serviceData)

  }

  return (
    <Modal show={show} onHide={hide} dialogClassName="modal-70w">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Serviço</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleData}>
        <Modal.Body>
          <Col className='text-center mb-3'>
            {(imagePreview) ? (<>
              <img className='rounded w-25' src={URL.createObjectURL(imagePreview)} alt={name} />
            </>) : (<>
              <img className='rounded w-25' src='https://via.placeholder.com/250' alt={name} />
            </>)}
          </Col>
          <Form.Group className="mb-3">
            <Form.Label>Imagem do serviço</Form.Label>
            <Form.Control type="file" onChange={handleFile}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome do serviço</Form.Label>
            <Form.Control type="text" value={name || ''} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={3} value={description || ''} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control type="number" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          {error && <Message type="danger" msg={error} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide} >
            Fechar
          </Button>
          <Button type="submit" variant="primary">
            Cadastrar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddService
