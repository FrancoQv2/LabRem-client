import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MediaQuery from "react-responsive"

function Footer() {
    const currentYear = new Date().getFullYear() || 2023

    return (
        <Container fluid className="bg-dark">
            <MediaQuery minWidth={1150}>
                <Row className="bg-dark d-flex justify-content-center align-items-center">
                    <Col sm={12} lg={6} className="text-center text-lg-start">
                        <p className="text-white py-3 mb-0">
                            Facultad de Ciencias Exactas y Tecnología - Universidad Nacional de Tucumán
                        </p>
                    </Col>
                    <Col sm={12} lg={6} className="text-center text-lg-end">
                        <p className="text-white py-3 mb-0">
                            &copy; {currentYear} Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>
            </MediaQuery>
            <MediaQuery maxWidth={1150}>
                <Row className="bg-dark d-flex justify-content-center align-items-center">
                    <Col sm={12} className="text-center">
                        <p className="text-white pt-3 mb-0">
                            Facultad de Ciencias Exactas y Tecnología
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        <p className="text-white mb-0">
                            Universidad Nacional de Tucumán
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        <p className="text-white py-2 mb-0">
                            &copy; {currentYear} Todos los derechos reservados
                        </p>
                    </Col>
                </Row>
            </MediaQuery>
        </Container>
    )
}

export default Footer
