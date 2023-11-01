import { useState } from 'react'
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

  // window.addEventListener('beforeunload', () => {
  //   localStorage.clear()
  // })

  let isPageReloaded = false

  window.addEventListener('beforeunload', (event) => {
    if (isPageReloaded) {
      // La página se recargó, no limpies el localStorage
    } else {
      // La página se cierra o el usuario va hacia atrás, limpia el localStorage
      localStorage.clear()
    }
  })

  window.addEventListener('load', () => {
    isPageReloaded = true
  })

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
