import { Spinner, Fade } from 'react-bootstrap'

type Props = {
  load: boolean
}

const NewLoading = ({ load }: Props) => {
  return (
    <>
      {load && (
        <Fade in={load}>
          <div className="container-loading d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Fade>
      )}
    </>
  )
}

export default NewLoading
