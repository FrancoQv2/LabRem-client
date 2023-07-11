import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "@components/_form/FormSelect"
import FormText from "@components/_form/FormText"

import BtnDownloadImage from "@components/_button/BtnDownloadImage"
import BtnSaveLaboratorio from "@components/_button/BtnSaveLaboratorio"

import { usePostEnsayoSubmuestreo } from "@hooks/hooksControl"
import { submitSuccess, submitError } from "@libs/alerts"


/**
 * 
 */
function FormSubmuestreo({ idUsuario }) {

  // Definicion de valores posibles

  const valuesCaida = ["Cae agua", "No cae agua"]
  const defaultCaida = valuesCaida[0]

  // Definicion de Hooks

  const [submitActivo, setSubmitActivo] = useState(true)

  const [frecuenciaAgua, setFrecuenciaAgua] = useState("")
  const [frecuenciaLuz, setFrecuenciaLuz] = useState("")
  const [caidaAgua, setCaida] = useState(defaultCaida)

  const { mutate } = usePostEnsayoSubmuestreo()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo(current => !current)
    
    mutate(
      {
        idUsuario,
        frecuenciaAgua,
        frecuenciaLuz,
        caidaAgua
      },
      {
        onSuccess: (e) => {
          setTimeout(() => {
            setSubmitActivo(current => !current)
          }, 5000);
          
          submitSuccess(e)
        },
        onError: (e) => {
          setTimeout(() => {
            setSubmitActivo(current => !current)
          }, 5000);

          submitError(e.response.data)
        },
      }
    )
  }

  const helpText = "Texto de ayuda"

  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <FormText
        name="Frecuencia de Caída del Agua"
        limit={100}
        showLimit={false}
        state={frecuenciaAgua}
        setState={setFrecuenciaAgua}
        helpText={helpText}
      />

      <FormText
        name="Frecuencia de Caída de la Luz"
        limit={100}
        showLimit={false}
        state={frecuenciaLuz}
        setState={setFrecuenciaLuz}
        helpText={helpText}
      />

      <FormSelect
        name="Iniciar/Detener Caída de Agua"
        values={valuesCaida}
        defaultValue={defaultCaida}
        setState={setCaida}
        helpText={helpText}
      />

      <Row>
        {submitActivo ? (
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

        <Col className="text-center">
          <BtnSaveLaboratorio
            idUsuario={idUsuario}
            setSubmitActivo={setSubmitActivo}
            useHook={usePostEnsayoSubmuestreo}
            frecuenciaAgua={frecuenciaAgua}
            frecuenciaLuz={frecuenciaLuz}
            caidaAgua={caidaAgua}
          />
        </Col>

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>
      </Row>
    </Form>
  )
}

export default FormSubmuestreo
