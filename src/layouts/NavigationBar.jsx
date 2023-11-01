import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import logoUNT from '@assets/logoUNT.png'

const title = 'Laboratorios Remotos'

function NavigationBar() {
  console.log('NavBar')
  let informacion
  try {
    informacion = JSON.parse(localStorage.getItem('decodedToken'))
  } catch (error) {
    console.error('Error al cargar desde LocalStorage:', error)
  }
  // const informacion = JSON.parse(localStorage.getItem('decodedToken'))
  console.log(informacion)

  return (
    <Navbar className='bg-light'>
      <Container fluid>
        <Navbar.Brand href=''>
          <img alt='' src={logoUNT} width='65' height='30' className='d-inline-block align-top' />
          {'  ' + title}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <b>{`${informacion.usuario.nombre} ${informacion.usuario.apellido}`}</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
