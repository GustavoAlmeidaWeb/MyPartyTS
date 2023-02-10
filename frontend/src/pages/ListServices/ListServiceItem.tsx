import { uploads } from '@src/utils/config'
import { IServiceCreate } from '@src/interfaces/IService'
import { Badge, Button, Card, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

type Props = {
  service: IServiceCreate
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
}

const ListServiceItem = ({ service, handleDelete, handleEdit }: Props): JSX.Element => {
  return (
    <Card className="w-100 mb-3" as="li">
      <Card.Body className="row">
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 5 }} className="text-center">
          {service.image ? (
            <Image src={`${uploads}/services/${service.image}`} alt={service.name} className="max-height-120" />
          ) : (
            <Image src="https://via.placeholder.com/150" alt="serviço sem imagem" className="max-height-120" />
          )}
        </Col>
        <Col md={{ span: 8 }} sm={{ span: 7 }} xs={{ span: 7 }} className="ps-3 pe-2">
          <Card.Title className="d-flex align-items-center" as="h3">
            {service.name}
            <Badge className="fs-6 ms-1" bg="dark">
              {service.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Badge>
          </Card.Title>
          <Card.Text>{service.description}</Card.Text>
          <Col className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => handleEdit(service._id)}>
              <FontAwesomeIcon icon={faPencil} /> Editar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(service._id)}>
              <FontAwesomeIcon icon={faTrashCan} /> Excluir
            </Button>
          </Col>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default ListServiceItem
