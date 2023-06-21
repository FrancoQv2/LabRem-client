import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "../_form/FormSelect"
import FormRange from "../_form/FormRange"

import { usePostEnsayoConvergentes } from "../../hooks/hooksFisica"
import { submitSuccess, submitError } from "../../libs/alerts"

import BtnDownloadImage from "../_button/BtnDownloadImage"
import BtnSaveLaboratorio from "../_button/BtnSaveLaboratorio"


/**
 * 
 */
function FormConvergentes({ idUsuario }) {
  const tipoDiafragma = ["Sin diafragma", "Central", "Periférico", "Filtro rojo"]
  const defaultDiafragma = tipoDiafragma[0]

  const [distanciaFL, setDistanciaFL] = useState(120)
  const [distanciaLP, setDistanciaLP] = useState(70)
  const [diafragma, setDiafragma] = useState(defaultDiafragma)

  const { mutate, error, isLoading } = usePostEnsayoConvergentes()

  const [submitActivo, setSubmitActivo] = useState(true)

  // Definicion de textos de helpText para tooltip

  const helpText = {
    distanciaFL:  'Distancia entre el lente y el foco',
    distanciaLP:  'Distancia entre el lente y la pantalla',
    diaframa:     'Objeto utilizado para corregir aberraciones de la lentes'
  }

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo(current => !current)

    mutate(
      {
        idUsuario,
        distanciaFL,
        distanciaLP,
        diafragma
      },
      {
        onSuccess: (e) => {
          setTimeout(() => {
            setSubmitActivo(current => !current)
          }, 5000)

          submitSuccess(e)
        },
        onError: (e) => {
          setTimeout(() => {
            setSubmitActivo(current => !current)
          }, 5000)

          submitError(e.response.data)
        }
      }
    )
  }

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <FormRange
        name="distancia-lente"
        description="Distancia Foco - Lente"
        minValue="120"
        maxValue="970"
        step="5"
        unit="mm"
        state={distanciaFL}
        setState={setDistanciaFL}
        helpText={helpText.distanciaFL}
      />

      <FormRange
        name="distancia-pantalla"
        description="Distancia Lente - Pantalla"
        minValue="70"
        maxValue="970"
        step="5"
        unit="mm"
        state={distanciaLP}
        setState={setDistanciaLP}
        helpText={helpText.distanciaLP}
      />

      <FormSelect
        name="Diafragma"
        values={tipoDiafragma}
        defaultValue={defaultDiafragma}
        setState={setDiafragma}
        helpText={helpText.diaframa}
      />

      <Row>
        {submitActivo ? (
          <Col className="text-center d-grid gap-2">
            <Button variant="primary" type="submit">
              Iniciar ensayo
            </Button>
          </Col>
        ) : null}

        <Col className="text-center">
          <BtnSaveLaboratorio
            idUsuario={idUsuario}
            setSubmitActivo={setSubmitActivo}
            useHook={usePostEnsayoConvergentes}
            distanciaFL={distanciaFL}
            distanciaLP={distanciaLP}
            diafragma={diafragma}
          />
        </Col>

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>

      </Row>
    </Form>
  )
}

export default FormConvergentes
