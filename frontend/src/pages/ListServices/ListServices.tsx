import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnyAction } from "@reduxjs/toolkit"
import { createService, getAllServices } from "@src/slices/serviceSlice"
import { RootState } from "@src/store/store"
import { ThunkDispatch } from "redux-thunk"
import { Button, Form, Pagination } from "react-bootstrap"
import Loading from "@src/components/Loading"
import AddService from "../AddService/AddService"
import { useResetServiceStates } from "@src/hooks/useResetStates"
import { IPageParams } from "@src/interfaces/IService"

const ListServices = (): JSX.Element => {

  const { services, loading, success } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()
  const resetStates = useResetServiceStates(dispatch)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<number[]>([])

  const limitPage = {
    limit,
    page,
  } as IPageParams

  useEffect(() => {

    dispatch(getAllServices(limitPage))

    setPagination([])

    if(services) {
      for(let i = 1; i <= Math.ceil(services.total / services.per_page); i++) {
        pagination.push(i)
      }
    }
  }, [dispatch, limit, page])

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

  console.log(services)

  return (
    <>
    <AddService show={showModal} hide={handleClose} handleSubmit={handleSubmit} />
    <div>ListServices</div>
    <Form.Select className="my-4" onChange={(e) => setLimit(Number(e.target.value))}>
      <option>Mostrar quantos por página</option>
      <option value="10">10 Itens</option>
      <option value="5">5 Itens</option>
      <option value="3">3 Itens</option>
    </Form.Select>
      <Pagination>
        {pagination && pagination.map((page) => (
          <>
          {console.log('na pagina ' + page)}
          <Pagination.Item key={page}>{page}</Pagination.Item>
          </>
        ))}
      </Pagination>
    <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Serviço</Button>
    </>
  )
}

export default ListServices
