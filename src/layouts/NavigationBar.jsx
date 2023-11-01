import { useContext, useMemo, useState } from 'react'
// import { UserContext } from '@context/UserContext'
// import { InfoContext } from '@context/InfoContext'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import logoUNT from '@assets/logoUNT.png'

const title = 'Laboratorios Remotos'

function NavigationBar() {
  // const user = useContext(UserContext)
  // const { info } = useContext(InfoContext)
  // console.log(info)
  console.log('NavBar')
  // const token = useMemo(() => JSON.parse(localStorage.getItem('decodedToken')), [])

  // const [token, setToken] = useState({})

  // let token
  // try {
  // token = JSON.parse(localStorage.getItem('decodedToken'))
  const informacion = JSON.parse(localStorage.getItem('decodedToken'))
  console.log(informacion)
  // } catch (error) {
  //   console.log('Aun no hay token cargado')
  // }

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
            {/* <b>{user.nombreApellido}</b> */}
            {/* {token ? <b>{`${token.usuario.nombre} ${token.usuario.apellido}`}</b> : null} */}
            <b>{`${informacion.usuario.nombre} ${informacion.usuario.apellido}`}</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
