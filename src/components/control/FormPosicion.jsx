import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

import FormText from "../common/FormText"
import FormRange from "../common/FormRange"
import FormSelect from "../common/FormSelect"

import BtnDownloadImage from "../common/BtnDownloadImage"
import FormSavePosicion from "./FormSavePosicion"

import { usePostEnsayoPosicion } from "../../hooks/hooksControl"
import { submitSuccess, submitError } from "../../libs/alerts"

/**
 * 
 */
function FormPosicion({ idUsuario }) {

  // Definicion de valores posibles

  const valueDriver = ["Ninguna", "Retardos", "No linealidades", "Polos-ceros extras"]
  const defaultDriver = valueDriver[0]

  // Definicion de Hooks

  const [cambio, setCambio] = useState(true)

  const [anguloMotor, setAnguloMotor] = useState(0)
  const [rapidezMotor, setRapidezMotor] = useState("")

  const [modificacionesDriver, setModificacionesDriver] = useState(defaultDriver)

  const [rapidezControlador, setRapidezControlador] = useState("")
  const [anguloControlador, setAnguloControlador] = useState(0)

  const { mutate, error, isLoading } = usePostEnsayoPosicion()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCambio(current => !current)

    mutate(
      {
        idUsuario,
        rapidezMotor,
        anguloMotor,
        modificacionesDriver,
        rapidezControlador,
        anguloControlador,
        setCambio
      },
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

      <Container className="border border-secondary rounded px-4 pt-3">
        <Card.Subtitle>Motor y Tren reductor</Card.Subtitle>
        <FormRange
          name="elevacion"
          description="Ángulo de Salida"
          minValue="-180"
          maxValue="180"
          step="5"
          unit="°"
          state={anguloMotor}
          setState={setAnguloMotor}
        />
        <FormText
          name="Rapidez de cambio"
          limit={100}
          showLimit={false}
          state={rapidezMotor}
          setState={setRapidezMotor}
        />
      </Container>

      <hr />

      <Container className="border border-secondary rounded px-4 pt-3">
        <Card.Subtitle>Driver del Motor</Card.Subtitle>
        <FormSelect
          name="Modificaciones agregadas"
          values={valueDriver}
          defaultValue={defaultDriver}
          setState={setModificacionesDriver}
        />
      </Container>

      <hr />

      <Container className="border border-secondary rounded px-4 pt-3">
        <Card.Subtitle>Controlador</Card.Subtitle>
        <FormRange
          name="elevacion"
          description="Ángulo de Salida"
          minValue="-180"
          maxValue="180"
          step="5"
          unit="°"
          state={anguloControlador}
          setState={setAnguloControlador}
        />
        <FormText
          name="Rapidez de cambio"
          limit={100}
          showLimit={false}
          state={rapidezControlador}
          setState={setRapidezControlador}
        />
      </Container>

      <Row className="mt-4">
        {cambio ? (
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
        )}

        {/* <Col className="text-center">
          <FormSavePosicion
          idUsuario={idUsuario}
          rapidezMotor={rapidezMotor}
          anguloMotor={anguloMotor}
            modificacionesDriver={modificacionesDriver}
            rapidezControlador={rapidezControlador}
            anguloControlador={anguloControlador}
          />
        </Col> */}

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>

      </Row>
    </Form>
  )
}

export default FormPosicion
