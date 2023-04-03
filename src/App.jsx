import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import RootLayout from "./components/RootLayout.jsx"

import EnlaceWifi from "./pages/telecomunicaciones/EnlaceWifi"
import EnlaceRadio from "./pages/telecomunicaciones/EnlaceRadio"

import LentesConvergentes from "./pages/fisica/LentesConvergentes"
import LentesDivergentes from "./pages/fisica/LentesDivergentes"

import TxRxUART from "./pages/digital/TxRxUART"
import TxRxI2C from "./pages/digital/TxRxI2C"

import Estroboscopica from "./pages/control/Estroboscopica"
import Posicion from "./pages/control/Posicion"

import HomePage from "./pages/HomePage"

import Cookies from 'js-cookie'

function App() {
	// let { userId } = useParams();
	let params = useParams();
	console.log(params);

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
					<Route path="users/:userId" element={<EnlaceWifi />} />

					<Route exact path="/telecomunicaciones/enlace-wifi" element={<EnlaceWifi />}></Route>
					<Route exact path="/telecomunicaciones/enlace-radio" element={<EnlaceRadio />}></Route>

					<Route exact path="/fisica/lentes-convergentes" element={<LentesConvergentes />}></Route>
					<Route exact path="/fisica/lentes-divergentes" element={<LentesDivergentes />}></Route>

					<Route exact path="/digital/uart" element={<TxRxUART />}></Route>
					<Route exact path="/digital/i2c" element={<TxRxI2C />}></Route>

					<Route exact path="/control/Estroboscopica" element={<Estroboscopica />}></Route>
					<Route exact path="/control/Posicion" element={<Posicion />}></Route>
				</Routes>
			</RootLayout>
		</BrowserRouter>
	)
}

export default App
