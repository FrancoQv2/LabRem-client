import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

// import jwt from 'jsonwebtoken'

/**
 *
 */
function App() {
  // const URL_CAMARA_TELECO_WIFI  = import.meta.env.VITE_CAMERA_TELECO_WIFI
  // const URL_CAMARA_TELECO_RADIO = import.meta.env.VITE_CAMERA_TELECO_RADIO

  const URL_CAMARA_FISICA_CONV = import.meta.env.VITE_CAMERA_FISICA_CONV
  const URL_CAMARA_FISICA_DIV = import.meta.env.VITE_CAMERA_FISICA_DIV

  const URL_CAMARA_DIGITAL_UART = import.meta.env.VITE_CAMERA_DIGITAL_UART
  const URL_CAMARA_DIGITAL_I2C = import.meta.env.VITE_CAMERA_DIGITAL_I2C

  const URL_CAMARA_CONTROL_SUBM = import.meta.env.VITE_CAMERA_CONTROL_SUBM
  const URL_CAMARA_CONTROL_POS = import.meta.env.VITE_CAMERA_CONTROL_POS

  const user = {
    idLaboratorio: 1,
    idUsuario: 2,
    nombreApellido: 'Nombre Apellido',
    esProfesor: false
  }

  // const params = new URLSearchParams(window.location.search)
  // const token = params.get('token')

  // const decodedToken = jwt.decode(token)
  // console.log(decodedToken)

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
  //   idUsuario:      decodedToken.usuario.idUsuario,
  //   nombreApellido: `${decodedToken.usuario.nombre} ${decodedToken.usuario.apellido}`,
  //   // esProfesor:     decodedToken.usuario.rolSuperior,
  //   esProfesor:     false,
  //   idLaboratorio:  idLaboratorio,
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
              element={<LentesConvergentes URL_CAMARA={URL_CAMARA_FISICA_CONV} />}
            ></Route>
            <Route
              exact
              path='/fisica-experimental-basica/lentes-divergentes'
              element={<LentesDivergentes URL_CAMARA={URL_CAMARA_FISICA_DIV} />}
            ></Route>

            <Route
              exact
              path='/sistemas-digitales/uart'
              element={<TxRxUART URL_CAMARA={URL_CAMARA_DIGITAL_UART} />}
            ></Route>
            <Route
              exact
              path='/sistemas-digitales/i2c'
              element={<TxRxI2C URL_CAMARA={URL_CAMARA_DIGITAL_I2C} />}
            ></Route>

            <Route
              exact
              path='/automatizacion-control/submuestreo'
              element={<Submuestreo URL_CAMARA={URL_CAMARA_CONTROL_SUBM} />}
            ></Route>
            <Route
              exact
              path='/automatizacion-control/posicion'
              element={<Posicion URL_CAMARA={URL_CAMARA_CONTROL_POS} />}
            ></Route>
          </Routes>
        </RootLayout>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
