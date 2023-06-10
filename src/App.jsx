import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from "./context/UserContext.js"

import RootLayout from "./layouts/RootLayout.jsx"

import EnlaceWifi from "./pages/teleco/EnlaceWifi.jsx"
import EnlaceRadio from "./pages/teleco/EnlaceRadio.jsx"

import LentesConvergentes from "./pages/fisica/LentesConvergentes"
import LentesDivergentes from "./pages/fisica/LentesDivergentes"

import TxRxUART from "./pages/digital/TxRxUART"
import TxRxI2C from "./pages/digital/TxRxI2C"

import Submuestreo from "./pages/control/Submuestreo.jsx"
import Posicion from "./pages/control/Posicion"

import HomePage from "./pages/home/HomePage.jsx"

import Cookies from 'js-cookie'

function App() {
	// Cookies.set('idLaboratorio', '1')
	// Cookies.set('idUsuario', '2')
	// Cookies.set('nombreApellido', 'Nombre Apellido')
	// Cookies.set('esProfesor', 'true')

	// const user = {
	// 	idLaboratorio: 	Cookies.get('idLaboratorio'),
	// 	idUsuario: 		Cookies.get('idUsuario'),
	// 	nombreApellido: 	Cookies.get('nombreApellido'),
	// 	esProfesor: 	Cookies.get('esProfesor')
	// }

	const user = {
		idLaboratorio:  1,
		idUsuario: 		2,
		nombreApellido: "Nombre Apellido",
		esProfesor: 	true
	}

	return (
		<BrowserRouter>
			<UserContext.Provider value={user}>
				<RootLayout>
					<Routes>
						<Route exact path="/" element={<HomePage />}></Route>

						<Route exact path="/telecomunicaciones/enlace-wifi" element={<EnlaceWifi />}></Route>
						<Route exact path="/telecomunicaciones/enlace-radio" element={<EnlaceRadio />}></Route>

						<Route exact path="/fisica-experimental-basica/lentes-convergentes" element={<LentesConvergentes />}></Route>
						<Route exact path="/fisica-experimental-basica/lentes-divergentes" element={<LentesDivergentes />}></Route>

						<Route exact path="/sistemas-digitales/uart" element={<TxRxUART />}></Route>
						<Route exact path="/sistemas-digitales/i2c" element={<TxRxI2C />}></Route>

						<Route exact path="/automatizacion-control/submuestreo" element={<Submuestreo />}></Route>
						<Route exact path="/automatizacion-control/posicion" element={<Posicion />}></Route>
					</Routes>
				</RootLayout>
			</UserContext.Provider>
		</BrowserRouter>
	)
}

export default App
