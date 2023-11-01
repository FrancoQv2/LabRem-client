import { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LabInformation from '@components/common/LabInformation'
import LabVideoStreaming from '@components/common/LabVideoStreaming'

import FormHeader from '@components/_form/FormHeader'
import FormRadio from './FormRadio'

import TableQueryPaginated from '@components/common/TableQueryPaginated'
import ExportResults from '@components/common/ExportResults'

import { useInfoLaboratorio, useEnsayosUsuario, useEnsayos } from '@hooks/hooksTeleco'

import { headersRadio as tableHeaders } from '@libs/tableHeaders'

import imgRadio from '@assets/teleco_radio.png'

import { useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

/**
 *
 */
function EnlaceRadio() {
  const idLaboratorio = 2
  const URL_CAMARA = import.meta.env.VITE_CAMERA_TELECO_RADIO
  const { esProfesor } = useContext(UserContext)

  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [componentRef, setComponentRef] = useState({})

  const onClickTabs = () => {
    setShowForm(!showForm)
    setShowResults(!showResults)
  }

  // Obtencion y decodificacion de token por parametro URL
  const location = useLocation()
  const token = new URLSearchParams(location.search).get('token')

  let informacion
  if (!token) {
    console.log('Token no encontrado en la URL')
  } else {
    try {
      informacion = jwtDecode(token)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }
    localStorage.setItem('token', token)
    localStorage.setItem('informacion', JSON.stringify(informacion))

    // Elimina el parámetro 'token' de la URL
    setTimeout(() => {
      const baseURL = window.location.pathname
      window.history.replaceState({}, document.title, baseURL)
    }, 500)
  }

  /**
   * -----------------------------------------------------
   * Renderizado del componente
   * -----------------------------------------------------
   */
  return (
    <>
      <Container className='justify-content-center align-items-center my-4 border border-dark rounded'>
        <LabInformation
          imagen={imgRadio}
          idLaboratorio={idLaboratorio}
          useInfoLaboratorio={useInfoLaboratorio}
        ></LabInformation>
        <hr />

        <Row className='m-2 d-flex justify-content-center'>
          <Col sm={12} lg={5}>
            <LabVideoStreaming streamUrl={URL_CAMARA} className='m-2' />
          </Col>

          <Col sm={12} lg={7}>
            <Card>
              <FormHeader onClickTabs={onClickTabs} showForm={showForm} showResults={showResults} />

              <Card.Body>
                {showForm ? (
                  <Card id='lab-form'>
                    <Card.Body>
                      <FormRadio idUsuario={informacion.usuario.idUsuario} />
                    </Card.Body>
                  </Card>
                ) : null}

                {showResults ? (
                  <Card id='lab-results'>
                    <Card.Body>
                      <TableQueryPaginated
                        idLaboratorio={idLaboratorio}
                        idUsuario={informacion.usuario.idUsuario}
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
                  idUsuario={informacion.usuario.idUsuario}
                  esProfesor={esProfesor}
                  // esProfesor={informacion.usuario.rol[0].rol}
                  filename={'ensayos-radio'}
                  componentRef={componentRef}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EnlaceRadio
