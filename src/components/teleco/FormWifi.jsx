import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormRange from "../_form/FormRange"
import BtnDownloadImage from "../_button/BtnDownloadImage"

import { usePostEnsayoWifi } from "../../hooks/hooksTeleco"
import { submitSuccess, submitError } from "../../libs/alerts"

/**
 * 
 */
function FormWifi({ idUsuario }) {
  const [elevacion, setElevacion] = useState(0)
  const [azimut, setAzimut] = useState(0)
  const [cambio, setcambio] = useState(true)

  const { mutate, error, isLoading, isError, isSuccess } = usePostEnsayoWifi()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setcambio(current => !current);

    mutate(
      { idUsuario, elevacion, azimut, setcambio },
      {
        onSuccess: () => {
          // submitSuccess()
        },
        onError: () => {
          // submitError()
        },
      }
    )
  }

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <FormRange 
        name="elevacion"
        description="Ángulo de Elevación"
        minValue="0"
        maxValue="180"
        step="5"
        unit="°"
        state={elevacion}
        setState={setElevacion}
      />

      <FormRange 
        name="azimut"
        description="Ángulo de Azimut"
        minValue="0"
        maxValue="180"
        step="5"
        unit="°"
        state={azimut}
        setState={setAzimut}
      />

      <Row>
        { cambio ? (
          <Col className="text-center d-grid gap-2">
            <Button variant="primary" type="submit">
              Iniciar ensayo
            </Button>
          </Col>
        ) : (
          <Col className="text-center d-grid gap-2">
            <Button disabled variant="primary" type="submit">
              Iniciar ensayo
            </Button>
          </Col>
        ) }
         <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>
      </Row>
    </Form>
  )
}

export default FormWifi
