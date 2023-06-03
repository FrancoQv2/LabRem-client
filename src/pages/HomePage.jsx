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
        navigate("/fisica/lentes-convergentes")
    }
    const navigateDivergente = () => {
        navigate("/fisica/lentes-divergentes")
    }

    const navigateUART = () => {
        navigate("/digital/uart")
    }
    const navigateI2C = () => {
        navigate("/digital/i2c")
    }
    const navigateETB = () => {
        navigate("/control/submuestreo")
    }
    const navigatePOS = () => {
        navigate("/control/posicion")
    }
     // es para generar, esto se debe eliminar
    //gettokengenerar()
    
    const handlerConvergente = async () => {
        const token= await axios.get("http://localhost:5032/fisica/token");
        navigate(`fisica/lentes-convergentes/?token=${token.data}`);
    };
    const handlerDivergente = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`fisica/lentes-divergentes/?token=${token.data}`);
    };
    const handlerWifi = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`telecomunicaciones/enlace-wifi/?token=${token.data}`);
    };
    const handlerRadio = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`/telecomunicaciones/enlace-radio/?token=${token.data}`);
    };
    const handlerUART = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`/digital/uart/?token=${token.data}`);
    };
    const handlerI2C = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`/digital/i2c/?token=${token.data}`);
    };
    const handlerETB = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`/control/estroboscopica/?token=${token.data}`);
    };
    const handlerPOS = async () => {
        const token= await axios.get("http://localhost:3035/api/arduino/generate");
        navigate(`/control/Posicion/?token=${token.data}`);
    };
    // fin
    return (
        <Container className="justify-content-center align-items-center my-4 border border-dark rounded">
            <hr />
            <Row className="m-2">
                <h1>Telecomunicaciones</h1>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateWifi}>
                        Enlace Wifi punto a punto
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateRadio}>
                        Enlace Radio punto a punto
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row className="m-2">
                <h1>Física Experimental Básica</h1>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateConvergente}>
                        Lentes Convergentes
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateDivergente}>
                        Lentes Divergentes
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row className="m-2">
                <h1>Sistemas Digitales</h1>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateUART}>
                        Transmisor/Receptor UART
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateI2C}>
                        Transmisor/Receptor I2C
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row className="m-2">
                <h1>Automatización y Control</h1>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigateETB}>
                        Submuestreo, aliasing y efecto estroboscópico
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={navigatePOS}>
                        Sistema de control automático de posición
                    </Button>
                </Col>
            </Row>
            <hr />
            {/* token */}
            <Row className="m-2">
                <hr />
                <h1>Con Token</h1>
                <hr /><hr />
                <h2>Telecomunicaciones</h2>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerWifi}>
                    Enlace Wifi punto a punto
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerRadio}>
                    Enlace Radio punto a punto
                    </Button>
                </Col>
            </Row>
            <Row className="m-2">
                <hr />
                <h2>Fisica Experimental Basica</h2>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerConvergente}>
                        Lentes Convergentes
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerDivergente}>
                        Lentes Divegentes
                    </Button>
                </Col>
            </Row>
            <Row className="m-2">
                <hr />
                <h2>Sistemas Digitales</h2>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerUART}>
                        LTransmisor/Receptor UART
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerI2C}>
                        Transmisor/Receptor I2C
                    </Button>
                </Col>
            </Row>
            <Row className="m-2">
                <hr />
                <h2>automatización y control</h2>
                <hr />
                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerETB}>
                    Submuestreo, aliasing y efecto estroboscópico
                    </Button>
                </Col>

                <Col sm={12} lg={6}>
                    <Button variant="primary" size="lg" onClick={handlerPOS}>
                    Sistema de control automático de posición
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
