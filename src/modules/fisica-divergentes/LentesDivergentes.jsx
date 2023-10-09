import { useContext, useState } from "react"
import { UserContext } from "@context/UserContext"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import LabInformation from "@components/common/LabInformation"
import LabVideoStreaming from "@components/common/LabVideoStreaming"

import FormHeader from "@components/_form/FormHeader"
import FormDivergentes from "./FormDivergentes"

import TableQueryPaginated from "@components/common/TableQueryPaginated"
import ExportResults from "@components/common/ExportResults"

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos } from "@hooks/hooksFisica"

import { headersDivergentes as tableHeaders } from "@libs/tableHeaders"

import imgDiv from "@assets/lente-divergente.png"

import VideoPlayer from "@components/common/VideoPlayer"

/**
 * 
 */
function LentesDivergentes() {
  const idLaboratorio = 2
  const { idUsuario, esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [componentRef, setComponentRef] = useState({})

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  const camera_url = import.meta.env.VITE_CAMERA_FISICA

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
      <LabInformation
        imagen={imgDiv}
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
          {/* <LabVideoStreaming url={camera_url} /> */}
          <VideoPlayer camera_url={camera_url}/>
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
                    <FormDivergentes idUsuario={idUsuario} />
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
                idLaboratorio={idLaboratorio}
                idUsuario={idUsuario}
                componentRef={componentRef}
                filename={"ensayos-divergentes"}
                Prof={esProfesor}
                exportToProfe={useEnsayos}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LentesDivergentes
