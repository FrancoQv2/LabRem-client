import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { usePostEnsayoWifi } from "../../hooks/telecomunicaciones"
import { submitSuccess, submitError } from "../../libs/alerts"

function FormWifi({ idUsuario }) {
    const [elevacion, setElevacion] = useState(0)
    const [azimut, setAzimut] = useState(0)

    const { mutate, error, isLoading } = usePostEnsayoWifi()

    const handleSubmit = async (e) => {
        e.preventDefault()

        mutate(
            { idUsuario, elevacion, azimut },
            {
                onSuccess: () => {
                    submitSuccess()
                },
                onError: () => {
                    submitError()
                },
            }
        )
    }

    return (
        <Form className="m-3" onSubmit={handleSubmit}>
            <Row className="my-3">
                <Form.Group
                    className="border border-secondary rounded"
                    controlId="formElevacionRange"
                >
                    <Row className="m-2">
                        <Col>
                            <Form.Range
                                min="0"
                                max="90"
                                step="5"
                                name="range-elevacion"
                                value={elevacion}
                                onChange={(changeEvent) =>
                                    setElevacion(changeEvent.target.value)
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col sm={4} lg={4}>
                            <span className="input-group-text" htmlFor="range-elevacion">
                                Elevación [ ° ]
                            </span>
                        </Col>
                        <Col sm={4} lg={8}>
                            <Form.Control disabled type="text" value={elevacion} />
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

            <Row className="my-3">
                <Form.Group
                    className="border border-secondary rounded"
                    controlId="formAzimutRange"
                >
                    <Row className="m-2">
                        <Col>
                            <Form.Range
                                min="0"
                                max="90"
                                step="5"
                                name="range-azimut"
                                value={azimut}
                                onChange={(changeEvent) => setAzimut(changeEvent.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col sm={4} lg={4}>
                            <span className="input-group-text" htmlFor="range-azimut">
                                Azimut [ ° ]
                            </span>
                        </Col>
                        <Col sm={4} lg={8}>
                            <Form.Control disabled type="text" value={azimut} />
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

            <Row>
                <Button variant="primary" type="submit">
                    Iniciar experiencia
                </Button>
            </Row>
        </Form>
    )
}

export default FormWifi
