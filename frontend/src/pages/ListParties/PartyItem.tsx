import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@src/store/store'
import { AnyAction } from '@reduxjs/toolkit'
import { getParty } from '@src/slices/partySlice'
import { uploads } from '@src/utils/config'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '@src/components/Loading'

type Props = {}

const PartyItem = (props: Props): JSX.Element => {
  const { party, loading } = useSelector((state: RootState) => state.party)
  const { id } = useParams()
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  useEffect(() => {
    dispatch(getParty(id))
  }, [id])

  console.log(party)

  if (loading) {
    return <Loading />
  }

  return (
    <>
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
                <td>{party.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
              <tr>
                <td scope="col">
                  <strong>Data e hora do Evento</strong>
                </td>
                <td>
                  {new Date(party.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} às {party.hour}h
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
            <tbody>
              {party.services && party.services.length > 0 && (
                <>
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
                      <td>{service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </Col>
      )}
    </>
  )
}

export default PartyItem
