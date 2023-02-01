import { Pagination } from "react-bootstrap"

type Props = {
  pages: number[]
  activePagination: number
  handlePage: (page: number) => void
}

const PaginationComponent = ({ pages, activePagination, handlePage }: Props) => {
  return (
    <Pagination>
      {pages && pages.map((page, index) => (
        <Pagination.Item key={index} active={page === activePagination} onClick={() => handlePage(page)}>{page}</Pagination.Item>
      ))}
    </Pagination>
  )
}

export default PaginationComponent
