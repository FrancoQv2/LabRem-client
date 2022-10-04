import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useInformationWifi } from "../hooks/telecomunicaciones";

/**
 * @param {Object} obj
 * @param {string} obj.data.area
 * @param {string} obj.data.nombre
 * @param {object} obj.labImagen
 * @param {string} obj.labImagen.imgAlt
 * @param {string} obj.labImagen.imgSrc
 * @param {string} obj.data.descripcion
 */
// function LabInformation({ data.area, data.nombre, labImagen, data.descripcion }) {
function LabInformation({ imagen }) {
  const { data, error, isLoading } = useInformationWifi();

  return (
    <>
      {!isLoading ? (
        <Container className="justify-content-center align-items-center my-4">
          <h3>{data.area}</h3>
          <hr />

          <h4>{data.nombre}</h4>
          <hr />

          <Accordion>
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
