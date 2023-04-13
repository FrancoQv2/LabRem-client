import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import LabInformation from "../../components/common/LabInformation";
import LabVideoStreaming from "../../components/LabVideoStreaming";

import FormETB from "../../components/control/FormETB";
import TableQueryPaginated from "../../components/common/TableQueryPaginated";
import image from "../../assets/i2c.webp";
import { headersEstroboscopico as tableHeaders } from "../../libs/tableHeaders";
import ExportResults from "../../components/common/ExportResults"
import {useInformationLab, useEnsayosUsuario, useEnsayos } from "../../hooks/control"

/**
 * @return Pagina del laboratorio de Enlace Wifi
 */
function Estroboscopica() {
  const [showForm, setShowForm] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const idLabActual = 1;
  const idUsuarioActual = 2;
  const prof = true//definir con atilio como me lo manda para saber que es un profesor de fisica y no de otra area;
  const onClickTabs = () => {
    setShowForm(!showForm);
    setShowResults(!showResults);
  };

  const [componentRef, setComponentRef] = useState({});
  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation 
            imagen={image} 
            idLaboratorio={idLabActual}
            useInfoLaboratorio={useInformationLab}>      
      </LabInformation>
      <hr />

      <Row className="m-2">
        <Col
          className="d-flex justify-content-center align-items-center"
          sm={12}
          lg={5}
        >
          <LabVideoStreaming />
        </Col>

        <Col sm={12} lg={7}>
          <Card>
            <Card.Header>
              <Nav fill variant="tabs" defaultActiveKey="#lab-form">
                <Nav.Item>
                  <Nav.Link
                    eventKey="#lab-form"
                    onClick={showForm ? null : onClickTabs}
                  >
                    Formulario
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

            <Card.Body>
              {showForm ? (
                <Card id="lab-form">
                  <Card.Body>
                    <Card.Title>Ingrese los datos</Card.Title>
                    <FormETB idUsuario={idUsuarioActual} />
                  </Card.Body>
                </Card>
              ) : null}

              {showResults ? (
                <Card id="lab-results">
                  <Card.Body>
                    <Card.Title>Ensayos realizados</Card.Title>
                    <TableQueryPaginated
                      idLaboratorio={idLabActual}
                      idUsuario={idUsuarioActual}
                      tableHeaders={tableHeaders}
                      useHook={useEnsayosUsuario}
                      setComponentRef={setComponentRef}
                    />
                  </Card.Body>
                </Card>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <ExportResults 
                useHook={useEnsayosUsuario}
                exportToProfe={useEnsayos}
                idLaboratorio={idLabActual}
                idUsuario={idUsuarioActual}
                Prof={prof}
                filename={"ensayos-Estroboscopico"}
                componentRef={componentRef}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Estroboscopica;
