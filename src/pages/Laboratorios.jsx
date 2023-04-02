import { useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import lab from "../libs/laboratorios.json"

function Laboratorios() {

    const [labo, setLabo] = useState({})

    const postLaboratorio = async (labo) => {
        const newLaboratorio = {
            idLaboratorio: labo.idLaboratorio,
            codigo: labo.codigo,
            area: labo.area,
            nombre: labo.nombre,
            descripcion: labo.descripcion,
        }

        console.log(newLaboratorio)
        const { data } = await axios.post(labo.urlAPI, newLaboratorio)
        return data
    }

    function usePostLaboratorio() {
        return useMutation(postLaboratorio)
    }

    const { mutate } = usePostLaboratorio()

    const handleSubmit = async (e) => {
        e.preventDefault()

        mutate(labo)
    }

    return (
        <Form className="m-3" onSubmit={handleSubmit}>

            <Row className="my-3">
                <Form.Group
                    className="border border-secondary rounded"
                    controlId="formLabo"
                    onChange={(changeEvent) => {
                        setLabo(JSON.parse(changeEvent.target.value))
                    }}
                >
                    <Row className="my-3">
                        <Col sm={4} lg={6}>
                            <span className="input-group-text" htmlFor="select-labo">
                                Elegir Laboratorio
                            </span>
                        </Col>
                        <Col sm={4} lg={6}>
                            <Form.Select aria-label="select-labo">
                                <option value={{}}>-</option>
                                <option value={JSON.stringify(lab.teleco_wifi)}>    {lab.teleco_wifi.nombre}  </option>
                                <option value={JSON.stringify(lab.teleco_radio)}>   {lab.teleco_radio.nombre} </option>
                                <option value={JSON.stringify(lab.fisica_conv)}>    {lab.fisica_conv.nombre}  </option>
                                <option value={JSON.stringify(lab.fisica_div)}>     {lab.fisica_div.nombre}   </option>
                                <option value={JSON.stringify(lab.digital_uart)}>   {lab.digital_uart.nombre} </option>
                                <option value={JSON.stringify(lab.digital_i2c)}>    {lab.digital_i2c.nombre}  </option>
                                <option value={JSON.stringify(lab.estroboscopica)}>    {lab.estroboscopica.nombre}  </option>
                                <option value={JSON.stringify(lab.posicion)}>    {lab.posicion.nombre}  </option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

            <Row>
                <Button variant="primary" size="sm" type="submit">
                    Cargar Info Laboratorios Telecomunicaciones
                </Button>
            </Row>
        </Form>
    )
}

export default Laboratorios
