import { uploads } from "@src/utils/config"
import { IServiceCreate } from "@src/interfaces/IService"
import { Button, Card, Col, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

type Props = {
  service: IServiceCreate
  handleDelete: (id: string) => void
}

const ListServiceItem = ({ service, handleDelete }: Props) => {
  return (
    <Card className="w-100 mb-3" as="li">
      <Card.Body className="d-flex align-items-center">
        <Col className="w-25 text-center">
          {service.image ? (
            <Image src={`${uploads}/services/${service.image}`} alt={service.name} className="max-height-120" />
          ) : (
            <Image src="https://via.placeholder.com/150" alt="serviço sem imagem" className="max-height-120" />
          )}
        </Col>
        <Col className="w-75 ps-3 pe-2">
          <Card.Title>{service.name}</Card.Title>
          <Card.Text>{service.description}</Card.Text>
          <Col className="d-flex justify-content-between">
            <Button variant="primary"><FontAwesomeIcon icon={faPencil} /> Editar</Button>
            <Button variant="danger" onClick={() => handleDelete(service._id)}><FontAwesomeIcon icon={faTrashCan} /> Excluir</Button>
          </Col>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default ListServiceItem
