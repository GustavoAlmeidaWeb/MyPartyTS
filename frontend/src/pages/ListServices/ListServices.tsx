import { ChangeEvent, EventHandler, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { createService, getAllServices } from "@src/slices/serviceSlice"
import { RootState } from "@src/store/store"
import { ThunkDispatch } from "redux-thunk"
import { Button, Form, Pagination, Col } from "react-bootstrap"
import { useResetServiceStates } from "@src/hooks/useResetStates"
import { IPageParams } from "@src/interfaces/IService"
import AddService from "../AddService/AddService"
import Loading from "@src/components/Loading"

const ListServices = (): JSX.Element => {

  const { services, loading, success } = useSelector((state: RootState) => state.service)
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

  const handleClose = (): void => setShowModal(false)

  const handleSubmit = async (data: any): Promise<void> => {

    const formData: FormData = new FormData()
    Object.keys(data).forEach((key: any) => formData.append(key, data[key]))

    await dispatch(createService(formData))
    resetStates()
  }

  const handleLimit = (e: ChangeEvent<HTMLSelectElement>): void => {
    setLimit(Number(e.target.value))
    setPage(1)
  }

  const handlePage = (page: number) => {
    setPage(page)
    setActivePagination(page)
  }

  return (
    <>
    <AddService show={showModal} hide={handleClose} handleSubmit={handleSubmit} />
    <div>ListServices</div>
    <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Serviço</Button>
    <Form.Select className="my-4" onChange={handleLimit}>
      <option value="10">Mostrar quantos por página</option>
      <option value="50">50 Itens</option>
      <option value="10">10 Itens</option>
      <option value="5">5 Itens</option>
      <option value="3">3 Itens</option>
    </Form.Select>
    <Col>
      {services.data && services.data.map((service: any) => (
        <>
        {console.log(service)}
        <p key={service._id}>{service.name}</p>
        </>
      ))}
    </Col>
    <Pagination>
      {calc && calc.map((page) => (
        <>
        <Pagination.Item key={page} active={page === activePagination} onClick={() => handlePage(page)}>{page}</Pagination.Item>
        </>
      ))}
    </Pagination>
    </>
  )
}

export default ListServices
