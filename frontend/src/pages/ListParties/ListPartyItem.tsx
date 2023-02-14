import { Link } from 'react-router-dom'
import { IPartyCreate } from '@src/interfaces/IParty'
import { Col, Card, Image, Button, Badge } from 'react-bootstrap'
import { uploads } from '@src/utils/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { formatMoney } from '@src/utils/helpers'

type Props = {
  party: IPartyCreate
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

const ListPartyItem = ({ party, handleEdit, handleDelete }: Props): JSX.Element => {
  return (
    <Card className="w-100 mb-3" as="li">
      <Card.Body className="row">
        <Col md={{ span: 4 }} sm={{ span: 5 }} xs={{ span: 5 }} className="text-center">
          {party.image ? (
            <Image src={`${uploads}/parties/${party.image}`} alt={party.title} className="max-height-120" />
          ) : (
            <Image src="https://via.placeholder.com/150" alt="serviço sem imagem" className="max-height-120" />
          )}
        </Col>
        <Col md={{ span: 8 }} sm={{ span: 7 }} xs={{ span: 7 }} className="ps-3 pe-2">
          <Card.Title className="d-flex align-items-center" as="h3">
            <Link className="text-decoration-none" to={`/festa/${party._id}`}>
              {party.title}
            </Link>
            <Badge className="fs-6 ms-1" bg="dark">
              {formatMoney(party.budget)}
            </Badge>
          </Card.Title>
          <Card.Text>{party.description}</Card.Text>
          <Col className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => handleEdit(party._id)}>
              <FontAwesomeIcon icon={faPencil} /> Editar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(party._id)}>
              <FontAwesomeIcon icon={faTrashCan} /> Excluir
            </Button>
          </Col>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default ListPartyItem
