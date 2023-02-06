import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import { getAllParties, getParty } from '@src/slices/partySlice'
import { IPageParams } from '@src/interfaces/IService'
import { IPartyCreate } from '@src/interfaces/IParty'
import Loading from '@src/components/Loading'
import PaginationComponent from '@src/components/PaginationComponent'
import { Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddParty from '../AddParty/AddParty'

const ListParties = (): JSX.Element => {
  const { party, parties, loading } = useSelector(
    (state: RootState) => state.party,
  )
  const dispatch = useDispatch<ThunkDispatch<void, RootState, AnyAction>>()

  const [editParty, setEditParty] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [calc, setCalc] = useState<number[]>([])
  const [pagination, setPagination] = useState<number[]>([])
  const [activePagination, setActivePagination] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)

  const limitPage = {
    limit,
    page,
  } as IPageParams

  useEffect(() => {
    dispatch(getAllParties(limitPage))
    // dispatch(getParty('63c6a7afc225982814a663b1'))
  }, [dispatch, limit, page])

  useEffect(() => {
    if (parties) {
      for (let i = 1; i <= Math.ceil(parties.total / parties.per_page); i++) {
        pagination.push(i)
      }
      setCalc([...pagination])
      setPagination([])
    }
  }, [parties])

  const handlePage = (page: number): void => {
    setPage(page)
    setActivePagination(page)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditParty(false)
  }

  if (loading) {
    return <Loading />
  }

  // console.log(parties)
  // console.log(party)

  return (
    <>
      <AddParty editParty={editParty} show={showModal} hide={handleClose} />
      <div>
        <h2 className="display-6">Minhas Festas</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Adicionar nova festa
        </Button>
      </div>
      {parties && parties.data && parties.data.length > 0 ? (
        <>
          {parties.data.map((party: IPartyCreate) => (
            <>
              <p>
                <Link to={`/festa/${party._id}`}>{party.title}</Link>
              </p>
            </>
          ))}
        </>
      ) : (
        <>
          <h3>Nenhuma festa cadastrada.</h3>
        </>
      )}
      <Col className="d-flex justify-content-between align-items-center">
        {parties && (
          <p className="text-muted">
            Total de festas: <strong>{parties.total}</strong>
          </p>
        )}
        <PaginationComponent
          pages={calc}
          activePagination={activePagination}
          handlePage={handlePage}
        />
      </Col>
    </>
  )
}

export default ListParties
