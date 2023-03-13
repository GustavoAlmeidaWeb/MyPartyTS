import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { useResetAddressStates } from '@src/hooks/useResetStates'
import { createAddress, getAllAddresses } from '@src/slices/addressSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form } from 'react-bootstrap'
import { IAddressCreate } from '@src/interfaces/IAddress'
import NewLoading from '@src/components/NewLoading'
import AddAddress from '../AddAddress/AddAddress'
import Message from '@src/components/Message'

const ListAddresses = (): JSX.Element => {
  const { addresses, loading, success, message, error } = useSelector((state: RootState) => state.address)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetAddressStates(dispatch)

  const [show, setShow] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [calc, setCalc] = useState<number[]>([])
  const [limit, setLimit] = useState<number>(10)
  const [pagination, setPagination] = useState<number[]>([])
  const [activePagination, setActivePagination] = useState<number>(1)

  const limitPage = {
    limit,
    page,
  }

  useEffect(() => {
    dispatch(getAllAddresses(limitPage))
  }, [dispatch, limit, page])

  useEffect(() => {
    handleClose()
    dispatch(getAllAddresses(limitPage))
  }, [success])

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = async (data: IAddressCreate | any): Promise<void> => {
    // console.log(data)
    await dispatch(createAddress(data))
    dispatch(getAllAddresses(limitPage))
    resetStates()
  }

  const handleLimit = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLimit(Number(e.target.value))
    setActivePagination(1)
    setPage(1)
  }

  console.log(addresses)

  return (
    <>
      <NewLoading load={loading} />
      <AddAddress show={show} hide={handleClose} handleSubmit={handleSubmit} />
      <Col className="d-flex justify-content-between align-items-center">
        <h2 className="display-6">Lista de Endereços</h2>
        <Button variant="primary" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Novo Endereço
        </Button>
      </Col>
      <Col className="d-flex justify-content-between align-items-center my-3">
        <p>Abaixo os endereço já cadastrados.</p>
        <Form.Select className="w-25" onChange={handleLimit}>
          <option value="10">Itens por página</option>
          <option value="20">20 Itens</option>
          <option value="15">15 Itens</option>
          <option value="10">10 Itens</option>
        </Form.Select>
      </Col>
      {message && <Message type="success" msg={message} />}
      {error && <Message type="danger" msg={error} />}
    </>
  )
}

export default ListAddresses
