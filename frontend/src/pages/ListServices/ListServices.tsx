import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { createService, deleteService, getAllServices } from "@src/slices/serviceSlice"
import { RootState } from "@src/store/store"
import { ThunkDispatch } from "redux-thunk"
import { Button, Form, Col } from "react-bootstrap"
import { useResetServiceStates } from "@src/hooks/useResetStates"
import { IPageParams, IServiceCreate } from "@src/interfaces/IService"
import AddService from "../AddService/AddService"
import PaginationComponent from "@src/components/PaginationComponent"
import ListServiceItem from "./ListServiceItem"
import Loading from "@src/components/Loading"
import Message from "@src/components/Message"

const ListServices = (): JSX.Element => {

  const { services, loading, success, message, error } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetServiceStates(dispatch)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [calc, setCalc] = useState<number[]>([])
  const [pagination, setPagination] = useState<number[]>([])
  const [activePagination, setActivePagination] = useState<number>(1)

  const limitPage = {
    limit,
    page,
  } as IPageParams

  /*
   * UseEffects
   */

  useEffect(() => {
    dispatch(getAllServices(limitPage))
  }, [dispatch, limit, page])

  useEffect(() => {
    if(services) {
      for(let i = 1; i <= Math.ceil(services.total / services.per_page); i++) {
        pagination.push(i)
      }
      setCalc([...pagination])
      setPagination([])
    }
  }, [services])

  useEffect(() => {
    handleClose()
    dispatch(getAllServices(limitPage))
  }, [success])

  /*
   * Handle Functions
   */

  const handleClose = (): void => setShowModal(false)

  const handleSubmit = async (data: any): Promise<void> => {
    const formData: FormData = new FormData()
    Object.keys(data).forEach((key: any) => formData.append(key, data[key]))
    await dispatch(createService(formData))
    resetStates()
  }

  const handleLimit = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLimit(Number(e.target.value))
    setActivePagination(1)
    setPage(1)
  }

  const handlePage = (page: number): void => {
    setPage(page)
    setActivePagination(page)
  }

  const handleDelete = async (id: string): Promise<void> => {
    await dispatch(deleteService(id))
    dispatch(getAllServices(limitPage))
    resetStates()
  }

  return (
    <>
    <AddService show={showModal} hide={handleClose} handleSubmit={handleSubmit} />
    <Col className="d-flex justify-content-between align-items-center">
      <h2 className="display-6">Seus serviços</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Serviço</Button>
    </Col>
    <Col className="d-flex justify-content-between align-items-center mb-3">
      <p>Abaixo os serviços que você já cadastrou.</p>
      <Form.Select className="w-25" onChange={handleLimit}>
        <option value="10">Itens por página</option>
        <option value="20">20 Itens</option>
        <option value="15">15 Itens</option>
        <option value="10">10 Itens</option>
      </Form.Select>
    </Col>
    {message && <Message type="success" msg={message}/>}
    {error && <Message type="danger" msg={error}/>}
    {services && services.data.length > 0 ? (<>
      <Col as="ul" className="ps-0">
        {services && services.data && services.data.map((service: IServiceCreate) => (
          <ListServiceItem service={service} handleDelete={handleDelete} key={service._id} />
        ))}
      </Col>
    </>) : (<>
      <Col className="my-5">
        <h3 className="text-center">Nenhum serviço cadastrado ainda, adicione um serviço.</h3>
      </Col>
    </>)}
    <Col className="d-flex justify-content-between align-items-center">
      {services && (
        <p className="text-muted">Total de serviços cadastrados: <strong>{services.total}</strong></p>
      )}
      <PaginationComponent pages={calc} activePagination={activePagination} handlePage={handlePage} />
    </Col>
    </>
  )
}

export default ListServices
