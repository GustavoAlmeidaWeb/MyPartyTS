import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  type: string
  msg: string
}

const Message = ({ type, msg }: Props): JSX.Element => {
  return (
    <Alert variant={type} className="mt-3">
      {type === 'success' ? (
        <>
          <FontAwesomeIcon icon="check" /> {msg}
        </>
      ) : (
        <>
          <FontAwesomeIcon icon="triangle-exclamation" /> {msg}
        </>
      )}
    </Alert>
  )
}

export default Message
