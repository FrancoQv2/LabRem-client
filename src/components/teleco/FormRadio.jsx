import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { usePostEnsayoRadio } from "../../hooks/hooksTeleco"
import { submitSuccess, submitError } from "../../libs/alerts"
import FormSelect from "../_form/FormSelect"

/**
 * 
 */
function FormRadio({ idUsuario }) {
  // const tipoMudulacion = ["4-QAM","8-QAM","16-QAM","PSK","FSK","QPSK"]
  // const defaultTipoMudulacion = tipoMudulacion[4]

  const [modulacion, setModulacion] = useState("")
  const [codificacion, setCodificacion] = useState(0)
  const [intensidadMin, setIntensidadMin] = useState(0)
  const [intensidadMax, setIntensidadMax] = useState(0)

  const { mutate, error, isLoading } = usePostEnsayoRadio()

  const handleSubmit = async (e) => {
    e.preventDefault()

    mutate(
      { idUsuario, modulacion, codificacion, intensidadMin, intensidadMax },
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
      {/* <FormSelect
        name="Tipo de Modulación"
        values={tipoMudulacion}
        defaultValue={defaultTipoMudulacion}
        setState={setModulacion}
      /> */}

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formTipoModulacion"
          onChange={(changeEvent) => setModulacion(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="tipo-modulacion">
                Tipo de Modulación
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="tipo-modulacion">
                <option value={0}>-</option>
                <option value={1}>4-QAM</option>
                <option value={2}>8-QAM</option>
                <option value={3}>16-QAM</option>
                <option value={4}>PSK</option>
                <option value={5}>FSK</option>
                <option value={6}>QPSK</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formTipoCodificacion"
          onChange={(changeEvent) => setCodificacion(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="tipo-codificacion">
                Tipo de Codificación
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="tipo-codificacion">
                <option value={0}>-</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formIntensidadMin"
          onChange={(changeEvent) => setIntensidadMin(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="intensidad-min">
                Intensidad Mínima [ dB ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="intensidad-min">
                <option value={0}>-</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formIntensidadMax"
          onChange={(changeEvent) => setIntensidadMax(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="intensidad-max">
                Intensidad Máxima [ dB ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="intensidad-max">
                <option value={0}>-</option>
                <option value={50}>50</option>
                <option value={80}>80</option>
                <option value={100}>100</option>
                <option value={120}>120</option>
              </Form.Select>
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

export default FormRadio
