import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function HomePage() {
  const navigate = useNavigate()

  const navigateWifi = () => {
    navigate('/telecomunicaciones/enlace-wifi')
  }
  const navigateRadio = () => {
    navigate('/telecomunicaciones/enlace-radio')
  }

  const navigateConvergente = () => {
    navigate('/fisica-experimental-basica/lentes-convergentes')
  }
  const navigateDivergente = () => {
    navigate('/fisica-experimental-basica/lentes-divergentes')
  }

  const navigateUART = () => {
    navigate('/sistemas-digitales/uart')
  }
  const navigateI2C = () => {
    navigate('/sistemas-digitales/i2c')
  }

  const navigateSubmuestreo = () => {
    navigate('/automatizacion-control/submuestreo')
  }
  const navigatePosicion = () => {
    navigate('/automatizacion-control/posicion')
  }

  return (
    <Container className='justify-content-center align-items-center my-4 border border-dark rounded'>
      <hr />
      <Row className='m-2'>
        <h1>Telecomunicaciones</h1>
        <hr />
        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateWifi}>
            Enlace Wifi punto a punto
          </Button>
        </Col>

        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateRadio}>
            Enlace Radio punto a punto
          </Button>
        </Col>
      </Row>

      <hr />

      <Row className='m-2'>
        <h1>Física Experimental Básica</h1>
        <hr />
        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateConvergente}>
            Lentes Convergentes
          </Button>
        </Col>

        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateDivergente}>
            Lentes Divergentes
          </Button>
        </Col>
      </Row>

      <hr />

      <Row className='m-2'>
        <h1>Sistemas Digitales</h1>
        <hr />
        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateUART}>
            Transmisor/Receptor UART
          </Button>
        </Col>

        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateI2C}>
            Transmisor/Receptor I2C
          </Button>
        </Col>
      </Row>

      <hr />

      <Row className='m-2'>
        <h1>Automatización y Control</h1>
        <hr />
        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigateSubmuestreo}>
            Submuestreo, aliasing y efecto estroboscópico
          </Button>
        </Col>

        <Col sm={12} lg={6} className='d-grid gap-2'>
          <Button variant='primary' size='lg' onClick={navigatePosicion}>
            Sistema de control automático de posición
          </Button>
        </Col>
      </Row>
      <hr />
    </Container>
  )
}

export default HomePage
