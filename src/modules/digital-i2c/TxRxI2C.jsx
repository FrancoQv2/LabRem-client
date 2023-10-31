import { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LabInformation from '@components/common/LabInformation'
import LabVideoStreaming from '@components/common/LabVideoStreaming'
import VideoPlayer from '@components/common/VideoPlayer'

import FormHeader from '@components/_form/FormHeader'
import FormI2C from './FormI2C'

import TableQueryPaginated from '@components/common/TableQueryPaginated'
import ExportResults from '@components/common/ExportResults'

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos } from '@hooks/hooksDigital'

import { headersI2C as tableHeaders } from '@libs/tableHeaders'

import imgI2C from '@assets/i2c.webp'

/**
 *
 */
function TxRxI2C() {
  const idLaboratorio = 2
  const { idUsuario, esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [componentRef, setComponentRef] = useState({})

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  const URL_CAMARA = import.meta.env.VITE_CAMERA_DIGITAL_I2C

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <Container className='justify-content-center align-items-center my-4 border border-dark rounded'>
      <LabInformation
        imagen={imgI2C}
        idLaboratorio={idLaboratorio}
        useInfoLaboratorio={useInfoLaboratorio}
      ></LabInformation>
      <hr />

      <Row className='m-2'>
        <Col sm={12} lg={5}>
          <LabVideoStreaming streamUrl={URL_CAMARA} className='m-2' />
          {/* <VideoPlayer camera_url={URL_CAMARA} /> */}
        </Col>

        <Col sm={12} lg={7}>
          <Card>
            <FormHeader onClickTabs={onClickTabs} showForm={showForm} showResults={showResults} />

            <Card.Body>
              {showForm ? (
                <Card id='lab-form'>
                  <Card.Body>
                    <FormI2C idUsuario={idUsuario} />
                  </Card.Body>
                </Card>
              ) : null}

              {showResults ? (
                <Card id='lab-results'>
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
                Prof={esProfesor}
                filename={'ensayos-i2c'}
                componentRef={componentRef}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TxRxI2C
