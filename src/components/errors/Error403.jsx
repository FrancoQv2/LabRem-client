// import Container from "react-bootstrap/Container"
// import Button from "react-bootstrap/Button"
// import Badge from 'react-bootstrap/Badge'
// import { Col, Row } from "react-bootstrap"
import Card from 'react-bootstrap/Card'

/**
 *
 */
function Error403({ handler }) {
  return (
    // <Container className="d-flex justify-content-center align-items-center my-4 p-5 border border-dark rounded">

    //     <Row className="m-2">
    //         <Col lg={12}>
    //             <h1>
    //                 <Badge bg="secondary">No autorizado o Token expirado</Badge>
    //             </h1>
    //         </Col>
    //     </Row>
    //     {/* <Row className="m-2">
    //         <Col lg={12}>
    //             <Button variant="primary" size="lg" onClick={handler}>
    //                 Login
    //             </Button>
    //         </Col>
    //     </Row> */}
    // </Container>
    <>
      <div className='container text-center'>
        <h1 className='my-5 display-3'>Error 403!</h1>
        <Card className='mx-auto my-5 p-3 bg-light shadow-lg text-center rounded-lg'>
          <h4>No estás autorizado para acceder a esta página</h4>
          <hr />
          <Card.Text>
            El error 403 o 403 Forbidden es un código de respuesta HTTP el cual indica que el servidor ha recibido y ha
            entendido la petición, pero rechaza enviar una respuesta.
          </Card.Text>
          <hr />
          <Card.Text>Para más información puedes consultar el siguiente enlace:</Card.Text>
          <a target='_blank' rel='noreferrer' href='https://developer.mozilla.org/es/docs/Web/HTTP/Status/403'>
            https://developer.mozilla.org/es/docs/Web/HTTP/Status/403
          </a>
        </Card>
      </div>
    </>
  )
}

export default Error403
