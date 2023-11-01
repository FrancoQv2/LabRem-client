import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { UserContext } from '@context/UserContext.js'

import RootLayout from '@layouts/RootLayout.jsx'

import EnlaceWifi from '@modules/teleco-wifi/EnlaceWifi'
import EnlaceRadio from '@modules/teleco-radio/EnlaceRadio'

import LentesConvergentes from '@modules/fisica-convergentes/LentesConvergentes'
import LentesDivergentes from '@modules/fisica-divergentes/LentesDivergentes'

import TxRxUART from '@modules/digital-uart/TxRxUART'
import TxRxI2C from '@modules/digital-i2c/TxRxI2C'

import Submuestreo from '@modules/control-submuestreo/Submuestreo'
import Posicion from '@modules/control-posicion/Posicion'

import HomePage from '@pages/home/HomePage.jsx'

import { jwtDecode } from 'jwt-decode'

/**
 *
 */
function App() {
  const user = {
    idLaboratorio: 1,
    idUsuario: 2,
    nombreApellido: 'Nombre Apellido',
    esProfesor: false
  }

  // Obtencion y decodificacion de token por parametro URL
  const location = useLocation()
  console.log(location)
  const token = new URLSearchParams(location.search).get('token')

  if (!token) {
    console.log('Token no encontrado en la URL')
  } else {
    let decodedToken
    try {
      decodedToken = jwtDecode(token)
    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }

    console.log(decodedToken)
    localStorage.setItem('token', token)
    localStorage.setItem('decodedToken', decodedToken)
  }

  // let idLaboratorio

  // switch (decodedToken.experiencia.idExperiencia) {
  //   case 1:
  //     idLaboratorio = 1 // UART
  //     break;
  //   case 2:
  //     idLaboratorio = 2 // I2C
  //     break;
  //   case 3:
  //     idLaboratorio = 1 // Submuestreo
  //     break;
  //   case 4:
  //     idLaboratorio = 2 // Posicion
  //     break;
  //   case 5:
  //     idLaboratorio = 1 // WiFi
  //     break;
  //   case 6:
  //     idLaboratorio = 2 // Radio
  //     break;
  //   case 7:
  //     idLaboratorio = 1 // Convergentes
  //     break;
  //   case 8:
  //     idLaboratorio = 2 // Divergentes
  //     break;
  // }

  // const user2 = {
  //   idUsuario: decodedToken.usuario.idUsuario,
  //   nombreApellido: `${decodedToken.usuario.nombre} ${decodedToken.usuario.apellido}`,
  //   // esProfesor:     decodedToken.usuario.rolSuperior,
  //   esProfesor: false,
  //   idLaboratorio
  // }

  // console.log(user2)

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <RootLayout>
          <Routes>
            <Route exact path='/' element={<HomePage />}></Route>

            <Route exact path='/telecomunicaciones/enlace-wifi' element={<EnlaceWifi />}></Route>
            <Route exact path='/telecomunicaciones/enlace-radio' element={<EnlaceRadio />}></Route>

            <Route
              exact
              path='/fisica-experimental-basica/lentes-convergentes'
              element={<LentesConvergentes />}
            ></Route>
            <Route exact path='/fisica-experimental-basica/lentes-divergentes' element={<LentesDivergentes />}></Route>

            <Route exact path='/sistemas-digitales/uart' element={<TxRxUART />}></Route>
            <Route exact path='/sistemas-digitales/i2c' element={<TxRxI2C />}></Route>

            <Route exact path='/automatizacion-control/submuestreo' element={<Submuestreo />}></Route>
            <Route exact path='/automatizacion-control/posicion' element={<Posicion />}></Route>
          </Routes>
        </RootLayout>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
