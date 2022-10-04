import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Container
      fluid
      className="bg-dark justify-content-center align-items-center"
    >
      <Row>
        <Col sm={12}>
          <p className="text-center text-white pt-3 mb-0">
            Universidad Nacional de Tucumán
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <p className="text-center text-white mb-0">
            Facultad de Ciencias Exactas y Tecnología
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <p className="text-center text-white py-3 mb-0">
            &copy; 2022 Todos los derechos reservados.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
