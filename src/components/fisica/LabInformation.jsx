import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useInformationLab } from "../../hooks/fisica";

/**
 * @param {object} imagen
 * @param {number} idLabActual
 */
function LabInformation({ imagen, idLabActual }) {
  const { data, error, isLoading } = useInformationLab(idLabActual);

  return (
    <>
      {!isLoading ? (
        <Container className="justify-content-center align-items-center my-4">
          <h3>{data.area}</h3>
          <hr />

          <h4>{data.nombre}</h4>
          <hr />

          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0" className="bg-light">
              <Accordion.Header>
                <b>Marco teórico de la experiencia</b>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={12} lg={4}>
                    <img
                      alt={data.nombre}
                      src={imagen}
                      className="img-fluid img-thumbnail"
                    />
                  </Col>
                  <Col sm={12} lg={8}>
                    <div>
                      <p>{data.descripcion}</p>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ) : (
        <div>
          <span className="spinner-border"></span>Cargando información...
        </div>
      )}
    </>
  );
}

export default LabInformation;
