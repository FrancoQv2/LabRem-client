import Card from "react-bootstrap/Card"
import Nav from "react-bootstrap/Nav"

function FormHeader({ onClickTabs, showForm, showResults }) {
  return (
    <Card.Header>
      <Nav fill variant="tabs" defaultActiveKey="#lab-form">
        <Nav.Item>
          <Nav.Link
            eventKey="#lab-form"
            onClick={showForm ? null : onClickTabs}
          >
            Parámetros de Entrada
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="#lab-results"
            onClick={showResults ? null : onClickTabs}
          >
            Resultados
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>
  )
}

export default FormHeader
