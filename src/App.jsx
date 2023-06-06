import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import RootLayout from "./components/RootLayout.jsx"

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
	// let params = useParams();
	// console.log(params);

	Cookies.set('idLaboratorio', '1')
	Cookies.set('idUsuario', '2')
	Cookies.set('nombreUsuario', 'Nombre Apellido')
	
	const session = {
		idLaboratorio: Cookies.get('idLaboratorio'),
		idUsuario: Cookies.get('idUsuario'),
		nombreUsuario: Cookies.get('nombreUsuario')
	}

	return (
		<BrowserRouter>
			<RootLayout session={session}>
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
		</BrowserRouter>
	)
}

export default App
