import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@src/store/store'
import { AnyAction } from '@reduxjs/toolkit'
import { deleteParty, getParty } from '@src/slices/partySlice'
import { uploads } from '@src/utils/config'
import { Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useResetPartyStates } from '@src/hooks/useResetStates'
import { formatDate, formatMoney } from '@src/utils/helpers'
import NewLoading from '@src/components/NewLoading'

const PartyItem = (): JSX.Element => {
  const { id } = useParams()
  const { party, loading } = useSelector((state: RootState) => state.party)
  const [totalServices, setTotalServices] = useState<number>()
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const navigate = useNavigate()
  const resetStates = useResetPartyStates(dispatch)

  useEffect(() => {
    dispatch(getParty(id))
  }, [id])

  useEffect(() => {
    if (party.services) {
      setTotalServices(party.services.reduce((sum: number, service: any) => (sum += Number(service.price)), 0))
    }
  }, [party.services])

  const handleDelete = async (id: string): Promise<void> => {
    await dispatch(deleteParty(id))
    resetStates()
    navigate('/festas')
  }

  return (
    <>
      <NewLoading load={loading} />
      {party && party._id && (
        <Col>
          {party.image ? (
            <img className="w-100" src={`${uploads}/parties/${party.image}`} alt={party.title} />
          ) : (
            <img className="w-100" src="https://via.placeholder.com/1280x600" alt="Festa sem imagem cadastrada" />
          )}
          <h2 className="display-6 my-3">{party.title}</h2>
          <table className="table">
            <tbody>
              <tr>
                <td scope="col">
                  <strong>Organizador</strong>
                </td>
                <td>{party.author}</td>
              </tr>
              <tr>
                <td scope="col">
                  <strong>Orçamento</strong>
                </td>
                <td>{formatMoney(party.budget)}</td>
              </tr>
              <tr>
                <td scope="col">
                  <strong>Data e hora do Evento</strong>
                </td>
                <td>
                  {formatDate(party.date)} às {party.hour}h
                </td>
              </tr>
            </tbody>
          </table>
          <h4 className="py-3 border-bottom">Descrição do evento</h4>
          <p>{party.description}</p>
          <h5 className="pt-3">Serviços contratados</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Preço</th>
              </tr>
            </thead>
            {party.services && party.services.length > 0 && (
              <>
                <tbody>
                  {party.services.map((service: any) => (
                    <tr key={service._id}>
                      <td className="w-25">
                        {service.image ? (
                          <img className="w-100" src={`${uploads}/services/${service.image}`} alt={service.name} />
                        ) : (
                          <img className="w-100" src="https://via.placeholder.com/150" alt="Serviço sem imagem" />
                        )}
                      </td>
                      <td>{service.name}</td>
                      <td>{formatMoney(service.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>Valor total</td>
                    <td>{totalServices && formatMoney(totalServices)}</td>
                  </tr>
                </tfoot>
              </>
            )}
          </table>
          <Button variant="danger" onClick={() => handleDelete(party._id)}>
            <FontAwesomeIcon icon={faTrashAlt} /> Excluir
          </Button>
        </Col>
      )}
    </>
  )
}

export default PartyItem
