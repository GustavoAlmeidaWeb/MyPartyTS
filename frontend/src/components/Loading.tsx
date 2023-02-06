import { Spinner, Container } from 'react-bootstrap'

const Loading = (): JSX.Element => {
  return (
    <Container className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  )
}

export default Loading
