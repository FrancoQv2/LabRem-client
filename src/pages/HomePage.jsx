import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import axios from "axios"

function HomePage() {
    const navigate = useNavigate()

    const navigateWifi = () => {
        navigate("/telecomunicaciones/enlace-wifi")
    }
    const navigateRadio = () => {
        navigate("/telecomunicaciones/enlace-radio")
    }

    const navigateConvergente = () => {
        navigate("/fisica-experimental-basica/lentes-convergentes")
    }
    const navigateDivergente = () => {
        navigate("/fisica-experimental-basica/lentes-divergentes")
    }

    const navigateUART = () => {
        navigate("/sistemas-digitales/uart")
    }
    const navigateI2C = () => {
        navigate("/sistemas-digitales/i2c")
    }

    const navigateSubmuestreo = () => {
        navigate("/automatizacion-control/submuestreo")
    }
    const navigatePosicion = () => {
        navigate("/automatizacion-control/posicion")
    }

    // Es para generar, esto se debe eliminar
    // gettokengenerar()
    
    const handlerWifi = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate")
        navigate(`telecomunicaciones/enlace-wifi/?token=${token.data}`)
    }
    const handlerRadio = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate")
        navigate(`/telecomunicaciones/enlace-radio/?token=${token.data}`)
    }
    const handlerConvergente = async () => {
        const token= await axios.get("http://localhost:5032/fisica/token")
        navigate(`fisica-experimental-basica/lentes-convergentes/?token=${token.data}`)
    }
    const handlerDivergente = async () => {
        const token= await axios.get("http://localhost:5032/fisica/token")
        navigate(`fisica-experimental-basica/lentes-divergentes/?token=${token.data}`)
    }
    const handlerUART = async () => {
        const token= await axios.get("http://localhost:5034/digital/token")
        navigate(`/sistemas-digitales/uart/?token=${token.data}`)
    }
    const handlerI2C = async () => {
        const token= await axios.get("http://localhost:5034/digital/token")
        navigate(`/sistemas-digitales/i2c/?token=${token.data}`)
    }
    const handlerSubmuestreo = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate")
        navigate(`/automatizacion-control/submuestreo/?token=${token.data}`)
    }
    const handlerPosicion = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate")
        navigate(`/automatizacion-control/posicion/?token=${token.data}`)
    }
    
    return (
        <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
            <hr />
            <Row className="m-2">
                <h1>Telecomunicaciones</h1>
                <hr />
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateWifi}>
                        Enlace Wifi punto a punto
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerWifi}>
                        Wifi - Token
                    </Button>
                </Col>

                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateRadio}>
                        Enlace Radio punto a punto
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerRadio}>
                        Radio - Token
                    </Button>
                </Col>
            </Row>
            
            <hr />

            <Row className="m-2">
                <h1>Física Experimental Básica</h1>
                <hr />
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateConvergente}>
                        Lentes Convergentes
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerConvergente}>
                        Convergentes - Token
                    </Button>
                </Col>

                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateDivergente}>
                        Lentes Divergentes
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerDivergente}>
                        Divergentes - Token
                    </Button>
                </Col>
            </Row>

            <hr />

            <Row className="m-2">
                <h1>Sistemas Digitales</h1>
                <hr />
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateUART}>
                        Transmisor/Receptor UART
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerUART}>
                        UART - Token
                    </Button>
                </Col>

                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateI2C}>
                        Transmisor/Receptor I2C
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerI2C}>
                        I2C - Token
                    </Button>
                </Col>
            </Row>

            <hr />

            <Row className="m-2">
                <h1>Automatización y Control</h1>
                <hr />
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigateSubmuestreo}>
                        Submuestreo, aliasing y efecto estroboscópico
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerSubmuestreo}>
                        Submuestreo - Token
                    </Button>
                </Col>

                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={navigatePosicion}>
                        Sistema de control automático de posición
                    </Button>
                </Col>
                <Col sm={12} lg={3} className="d-grid gap-2">
                    <Button variant="dark" size="lg" onClick={handlerPosicion}>
                        Posición - Token
                    </Button>
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default HomePage
