import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LabInformation from "../../components/common/LabInformation"
import LabVideoStreaming from "../../components/common/LabVideoStreaming"

import FormHeader from "../../components/_form/FormHeader"
import FormUART from "../../components/digital/FormUART"

import TableQueryPaginated from "../../components/common/TableQueryPaginated"
import ExportResults from "../../components/common/ExportResults"

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos, ValidarToken } from "../../hooks/hooksDigital"

import { headersUART as tableHeaders } from "../../libs/tableHeaders"
import { useLocation } from 'react-router-dom'
import imgUART from "../../assets/uart.png"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';

/**
 * 
 */
function TxRxUART() {
  const { idLaboratorio, idUsuario, esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [componentRef, setComponentRef] = useState({})

//logica de token
const searchParams = new URLSearchParams(useLocation().search)
let token = searchParams.get('token')

if (token == null) {
  token = localStorage.getItem('token')
}
localStorage.setItem('token', token)
const [validacion, setValidar] = useState(false)

ValidarToken().then(response => {
  setValidar(response)
})

// if (!validacion) {
//   Cookies.remove('nombreUsuario')
// }
// console.log(!Cookies.get('reload'))
// if (!Cookies.get('reload')) {
//   Cookies.set('reload', 'cargado')
//   window.location.reload()
// }
const handler = async () => {
  window.location.href = 'https://www.google.com.ar'
}
//final de logica token

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    validacion ? (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imgUART}
        idLaboratorio={idLaboratorio}
        useInfoLaboratorio={useInfoLaboratorio}
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
            <FormHeader
              onClickTabs={onClickTabs}
              showForm={showForm}
              showResults={showResults}
            />

            <Card.Body>
              {showForm ? (
                <Card id="lab-form">
                  <Card.Body>
                    <FormUART idUsuario={idUsuario} />
                  </Card.Body>
                </Card>
              ) : null}

              {showResults ? (
                <Card id="lab-results">
                  <Card.Body>
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
                Prof={esProfesor}
                filename={"ensayos-uart"}
                componentRef={componentRef}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    ) :
    <Container>
    <h2>
      <Badge bg="secondary">No autorizado o Token expirado</Badge>
    </h2>
    <Button variant="primary" size="lg" onClick={handler}>
      Login
    </Button>
  </Container>
  )
}

export default TxRxUART
