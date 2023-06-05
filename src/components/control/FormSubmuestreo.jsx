import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "../common/FormSelect"
import FormSaveETB from "./FormSaveSubmuestreo"
import BtnDownloadImage from "../common/BtnDownloadImage"

import { usePostEnsayoSubmuestreo } from "../../hooks/hooksControl"
import { submitSuccess, submitError } from "../../libs/alerts"
import FormText from "../common/FormText"

/**
 * 
 */
function FormSubmuestreo({ idUsuario }) {

  // Definicion de valores posibles

  const valuesCaida = ["Cae agua", "No cae agua"]
  const defaultCaida = valuesCaida[0]

  // Definicion de Hooks

  const [cambio, setCambio] = useState(true)

  const [frecuenciaAgua, setFrecuenciaAgua] = useState("")
  const [frecuenciaLuz, setFrecuenciaLuz] = useState("")
  const [caidaAgua, setCaida] = useState(defaultCaida)

  const { mutate, error, isLoading } = usePostEnsayoSubmuestreo()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCambio(current => !current)
    mutate(
      {
        idUsuario,
        frecuenciaAgua,
        frecuenciaLuz,
        caidaAgua,
        setCambio
      },
      {
        onSuccess: () => {

        },
        onError: () => {
          submitError()
        },
      }
    )
  }


  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <FormText
        name="Frecuencia de Caída del Agua"
        limit={100}
        showLimit={false}
        state={frecuenciaAgua}
        setState={setFrecuenciaAgua}
      />

      <FormText
        name="Frecuencia de Caída de la Luz"
        limit={100}
        showLimit={false}
        state={frecuenciaLuz}
        setState={setFrecuenciaLuz}
      />

      <FormSelect
        name="Iniciar/Detener Caída de Agua"
        values={valuesCaida}
        defaultValue={defaultCaida}
        setState={setCaida}
      />

      <Row>
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
          <FormSaveETB
            idUsuario={idUsuario}
            frecuenciaAgua={frecuenciaAgua}
            frecuenciaLuz={frecuenciaLuz}
            caidaAgua={caidaAgua}
          />
        </Col> */}

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>
      </Row>
    </Form>
  )
}

export default FormSubmuestreo
