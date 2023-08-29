import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from "@context/UserContext.js"

import RootLayout from "@layouts/RootLayout.jsx"

import EnlaceWifi from "@pages/teleco/EnlaceWifi.jsx"
import EnlaceRadio from "@pages/teleco/EnlaceRadio.jsx"

import LentesConvergentes from "@pages/fisica/LentesConvergentes"
import LentesDivergentes from "@pages/fisica/LentesDivergentes"

import TxRxUART from "@pages/digital/TxRxUART"
import TxRxI2C from "@pages/digital/TxRxI2C"

import Submuestreo from "@pages/control/Submuestreo.jsx"
import Posicion from "@pages/control/Posicion"

import HomePage from "@pages/home/HomePage.jsx"

function App() {
  const user = {
    idLaboratorio: 1,
    idUsuario: 2,
    nombreApellido: "Franco Quevedo",
    esProfesor: true,
  }

  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  const decodedToken = jwt.decode(token)
  console.log(decodedToken)

  let idLaboratorio

  switch (decodedToken.experiencia.idExperiencia) {
    case 1:
      idLaboratorio = 1 // UART
      break;
    case 2:
      idLaboratorio = 2 // I2C
      break;
    case 3:
      idLaboratorio = 1 // Submuestreo
      break;
    case 4:
      idLaboratorio = 2 // Posicion
      break;
    case 5:
      idLaboratorio = 1 // WiFi
      break;
    case 6:
      idLaboratorio = 2 // Radio
      break;
    case 7:
      idLaboratorio = 1 // Convergentes
      break;
    case 8:
      idLaboratorio = 2 // Divergentes
      break;
  }

  const user2 = {
    idUsuario:      decodedToken.usuario.idUsuario,
    nombreApellido: `${decodedToken.usuario.nombre} ${decodedToken.usuario.apellido}`,
    // esProfesor:     decodedToken.usuario.rolSuperior,
    esProfesor:     false,
    idLaboratorio:  idLaboratorio,
  }

  console.log(user2)

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <RootLayout>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>

            <Route
              exact
              path="/telecomunicaciones/enlace-wifi"
              element={<EnlaceWifi />}
            ></Route>
            <Route
              exact
              path="/telecomunicaciones/enlace-radio"
              element={<EnlaceRadio />}
            ></Route>

            <Route
              exact
              path="/fisica-experimental-basica/lentes-convergentes"
              element={<LentesConvergentes />}
            ></Route>
            <Route
              exact
              path="/fisica-experimental-basica/lentes-divergentes"
              element={<LentesDivergentes />}
            ></Route>

            <Route
              exact
              path="/sistemas-digitales/uart"
              element={<TxRxUART />}
            ></Route>
            <Route
              exact
              path="/sistemas-digitales/i2c"
              element={<TxRxI2C />}
            ></Route>

            <Route
              exact
              path="/automatizacion-control/submuestreo"
              element={<Submuestreo />}
            ></Route>
            <Route
              exact
              path="/automatizacion-control/posicion"
              element={<Posicion />}
            ></Route>
          </Routes>
        </RootLayout>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
