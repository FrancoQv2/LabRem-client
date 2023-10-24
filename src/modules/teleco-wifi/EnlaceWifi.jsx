import { useContext, useState } from "react"
import { UserContext } from "@context/UserContext"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LabInformation from "@components/common/LabInformation"
import LabVideoStreaming from "@components/common/LabVideoStreaming"
import VideoPlayer from "@components/common/VideoPlayer";

import FormHeader from "@components/_form/FormHeader"
import FormWifi from "./FormWifi"
import WiFiSignalStrength from "./WiFiSignalStrength"

import TableQueryPaginated from "@components/common/TableQueryPaginated"
import ExportResults from "@components/common/ExportResults"

import {
  useInfoLaboratorio,
  useEnsayosUsuario,
  useEnsayos,
} from "@hooks/hooksTeleco"

import { headersWifi as tableHeaders } from "@libs/tableHeaders"

import imagen from "@assets/teleco_wifi.jpg"

/**
 *
 */
function EnlaceWifi() {
  const idLaboratorio = 1
  const { idUsuario, esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  const [componentRef, setComponentRef] = useState({})

  const URL_CAMARA  = import.meta.env.VITE_CAMERA_TELECO_WIFI
  // const URL_ANTENA_TELECO_WIFI = `${import.meta.env.VITE_URL_DOMAIN}:3033/api/teleco/wifi/bullet`


  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imagen}
        idLaboratorio={idLaboratorio}
        useInfoLaboratorio={useInfoLaboratorio}
      ></LabInformation>
      <hr />

      {/* <Row className="m-2" style={{height: 600}}> */}
      <Row className="m-2 d-flex justify-content-center">
        <Col sm={12} lg={6}>
          {/* <LabVideoStreaming streamUrl={URL_CAMARA} className="m-2"/> */}
          <VideoPlayer camera_url={URL_CAMARA} />
          <hr />
          {/* <Row sm={12} lg={12} className="mx-0 my-1">
            <WiFiSignalStrength antennaUrl={URL_ANTENA_TELECO_WIFI}/>
          </Row> */}
          <hr />
        </Col>

        <Col sm={12} lg={6}>
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
                    <FormWifi idUsuario={idUsuario} />
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
                esProfesor={esProfesor}
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
