import { useState } from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Card from "react-bootstrap/Card"
import Nav from "react-bootstrap/Nav"

import LabInformation from "../../components/common/LabInformation"
import LabVideoStreaming from "../../components/LabVideoStreaming"

import FormDivergentes from "../../components/fisica/FormDivergentes"

import TableQueryPaginated from "../../components/common/TableQueryPaginated"
import ExportResults from "../../components/common/ExportResults"

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos } from "../../hooks/fisica"

import { headersDivergentes as tableHeaders } from "../../libs/tableHeaders"

import imgDiv from "../../assets/lente-divergente.png"

/**
 * @return Pagina del laboratorio de Enlace Wifi
 */
function LentesDivergentes() {
    const [showForm, setShowForm] = useState(true)
    const [showResults, setShowResults] = useState(false)

  const idLabActual = 2;
  const idUsuarioActual = 2;
  const prof = false;//definir con atilio como me lo manda para saber que es un profesor de fisica y no de otra area;
  
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
        imagen={imgRadio}
        idLabActual={idLabActual}
      ></LabInformation>
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
                                        <FormDivergentes idUsuario={idUsuarioActual} />
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
                                filename={"ensayos-divergentes"}
                                componentRef={componentRef}
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LentesDivergentes
