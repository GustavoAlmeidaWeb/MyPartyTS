import "@src/assets/css/footer.css"
import { Container } from "react-bootstrap"

const Footer = (): JSX.Element => {

  const date = new Date().getFullYear()

  return (
    <Container as="footer" className="cls-footer bg-dark text-light text-center py-5" fluid>
      <p>{date} &copy; MyParty - Organize sua festa. Todos os direitos reservados.</p>
    </Container>
  )
}

export default Footer
