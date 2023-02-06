import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import LabInformation from "../../components/LabInformation";
import LabVideoStreaming from "../../components/LabVideoStreaming";
import FormWifi from "../../components/telecomunicaciones/FormWifi";
import TableQueryPaginated from "../../components/TableQueryPaginated";

import { useInfoLaboratorio } from "../../hooks/telecomunicaciones";

import { headersWifi as tableHeaders } from "../../libs/tableHeaders";
import imgWifi from "../../assets/teleco_wifi.jpg";

import ExportResults from "../../components/common/ExportResults"

import { useEnsayosUsuario } from "../../hooks/telecomunicaciones"

/**
 * -----------------------------------------------------
 * Componente EnlaceWifi
 * -----------------------------------------------------
 * @return Pagina del laboratorio de Enlace Wifi
 */
function EnlaceWifi() {
  const [showForm, setShowForm] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const idLabActual = 1;
  const idUsuarioActual = 2;

  const onClickTabs = () => {
    setShowForm(!showForm);
    setShowResults(!showResults);
  };

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imgWifi}
        idLabActual={idLabActual}
        useInfoLaboratorio={useInfoLaboratorio}
      ></LabInformation>
      <hr />

      {/* <Row className="m-2" style={{height: 600}}> */}
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

            {/* <Card.Body style={{height: 525}}> */}
            <Card.Body>
              {showForm ? (
                <Card id="lab-form">
                  <Card.Body>
                    <Card.Title>Ingrese los datos</Card.Title>
                    <FormWifi idUsuario={idUsuarioActual} />
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
                    />
                  </Card.Body>
                </Card>
              ) : null}

            </Card.Body>

            <Card.Footer>
              <ExportResults 
                useHook={useEnsayosUsuario}
                idLaboratorio={idLabActual}
                idUsuario={idUsuarioActual}
                filename={"wifi-ensayos"}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EnlaceWifi;
