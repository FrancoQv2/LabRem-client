import { useContext } from "react"
import { UserContext } from "../App"

import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

import logoUNT from "../assets/logoUNT.png"

const title = "Laboratorios Remotos"

function NavigationBar() {
	const user = useContext(UserContext)

	return (
		<Navbar className="bg-light">
			<Container fluid>
				<Navbar.Brand href="">
					<img
						alt=""
						src={logoUNT}
						width="65"
						height="30"
						className="d-inline-block align-top"
					/>
					{"  " + title}
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<b>{user.nombreUsuario}</b>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default NavigationBar
