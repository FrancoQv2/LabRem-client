import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * @param {object} Lab
 * @param {object} Lab.imagen
 * @param {number} Lab.idLabActual
 * @param {hook} Lab.useInfoLaboratorio
 */
function LabInformation({ imagen, idLabActual, useInfoLaboratorio }) {
  const { data, isLoading } = useInfoLaboratorio(idLabActual);

  return (
    <>
      {!isLoading ? (
        <Container className="justify-content-center align-items-center my-4">
          <h3>{data.area}</h3>
          <hr />

          <h4>{data.nombre}</h4>
          <hr />

          {/* <Accordion defaultActiveKey={["0"]} alwaysOpen> */}
          <Accordion >
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
