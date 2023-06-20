import { useState } from "react"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LabInformation from "../../components/common/LabInformation"
import LabVideoStreaming from "../../components/common/LabVideoStreaming"

import FormHeader from "../../components/_form/FormHeader"
import FormWifi from "../../components/teleco/FormWifi"

import TableQueryPaginated from "../../components/common/TableQueryPaginated"
import ExportResults from "../../components/common/ExportResults"

import {
  useInfoLaboratorio,
  useEnsayosUsuario,
  useEnsayos,
} from "../../hooks/hooksTeleco"

import { headersWifi as tableHeaders } from "../../libs/tableHeaders"

import imgWifi from "../../assets/teleco_wifi.jpg"


/**
 * -----------------------------------------------------
 * Componente EnlaceWifi
 * -----------------------------------------------------
 * @return Pagina del laboratorio de Enlace Wifi
 */
function EnlaceWifi() {
  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)

  const idLaboratorio = 1
  const idUsuario = 2

  // TODO: Definir con Atilio como me lo manda para saber que es un profesor de fisica y no de otra area
  const prof = false

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  const [componentRef, setComponentRef] = useState({})

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imgWifi}
        idLaboratorio={idLaboratorio}
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
            <FormHeader
              onClickTabs={onClickTabs}
              showForm={showForm}
              showResults={showResults}
            />

            {/* <Card.Body style={{height: 525}}> */}
            <Card.Body>
              {showForm ? (
                <Card id="lab-form">
                  <Card.Body>
                    <Card.Title>Ingrese los datos</Card.Title>
                    <FormWifi idUsuario={idUsuario} />
                  </Card.Body>
                </Card>
              ) : null}

              {showResults ? (
                <Card id="lab-results">
                  <Card.Body>
                    <Card.Title>Ensayos realizados</Card.Title>
                    <TableQueryPaginated
                      idLaboratorio={idLaboratorio}
                      idUsuario={idUsuario}
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
                  idLaboratorio={idLaboratorio}
                  idUsuario={idUsuario}
                  Prof={prof}
                  filename={"ensayos-wifi"}
                  componentRef={componentRef}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EnlaceWifi
