import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LabInformation from "../../components/common/LabInformation"
import LabVideoStreaming from "../../components/common/LabVideoStreaming"

import FormHeader from "../../components/_form/FormHeader"
import FormConvergentes from "../../components/fisica/FormConvergentes"

import TableQueryPaginated from "../../components/common/TableQueryPaginated"
import ExportResults from "../../components/common/ExportResults"

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos, ValidarToken } from "../../hooks/hooksFisica"

import { headersConvergentes as tableHeaders } from "../../libs/tableHeaders"

import imgConv from "../../assets/lente-convergente.jpg"

import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import Error503 from "../../components/errors/Error403"

/**
 * 
 */
function LentesConvergentes() {
  const { idLaboratorio, idUsuario, esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [componentRef, setComponentRef] = useState({})

  // //logica de token
  // const searchParams = new URLSearchParams(useLocation().search)
  // let token = searchParams.get('token')

  // if (token == null) {
  //   token = localStorage.getItem('token')
  // }
  // localStorage.setItem('token', token)
  // const [validacion, setValidar] = useState(false)

  // ValidarToken().then(response => {
  //   setValidar(response)
  // })

  // if (!validacion) {
  //   Cookies.remove('nombreUsuario')
  // }
  // // console.log(!Cookies.get('reload'))
  // if (!Cookies.get('reload')) {
  //   Cookies.set('reload', 'cargado')
  //   window.location.reload()
  // }
  // const handler = async () => {
  //   window.location.href = 'https://www.google.com.ar'
  // }
  // //final de logica token

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
    // validacion ? (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imgConv}
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
                    <FormConvergentes idUsuario={idUsuario} />
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
              {/* <ExportResults
                  useHook={useEnsayosUsuario}
                  exportToProfe={useEnsayos}
                  idLaboratorio={idLaboratorio}
                  idUsuario={idUsuario}
                  Prof={esProfesor}
                  filename={"ensayos-convergentes"}
                  componentRef={componentRef}
                /> */}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    // ) :
    // <Error503 handler={handler} />
  )
}

export default LentesConvergentes
