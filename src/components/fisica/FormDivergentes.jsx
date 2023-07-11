import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "@components/_form/FormSelect"
import FormRange from "@components/_form/FormRange"

import { usePostEnsayoDivergentes } from "@hooks/hooksFisica"
import { submitSuccess, submitError } from "@libs/alerts"

import BtnDownloadImage from "@components/_button/BtnDownloadImage"
import BtnSaveLaboratorio from "@components/_button/BtnSaveLaboratorio"


/**
 * 
 */
function FormDivergentes({ idUsuario }) {
  const tipoDiafragma = ["Sin diafragma","Central","Periférico","Filtro rojo"]
  const defaultDiafragma = tipoDiafragma[0]

  const [distanciaFL, setDistanciaFL] = useState(50)
  const [distanciaLL, setDistanciaLL] = useState(70)
  const [distanciaLP, setDistanciaLP] = useState(70)
  const [diafragma, setDiafragma] = useState(defaultDiafragma)

  const { mutate, error, isLoading } = usePostEnsayoDivergentes()

  const [submitActivo, setSubmitActivo] = useState(true)

  // Definicion de textos de helpText para tooltip

  const helpText = {
    distanciaFL:  'Distancia entre el lente y el foco',
    distanciaLL:  'Distancia entre el lente y la pantalla',
    distanciaLP:  'Distancia entre el lente  convergente y divergente',
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
        distanciaLL, 
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
        name="distanciaFL"
        description="Distancia Foco - Lente 1"
        minValue="50"
        maxValue="920"
        step="5"
        unit="mm"
        state={distanciaFL}
        setState={setDistanciaFL}
        helpText={helpText.distanciaFL}
      />

      <FormRange 
        name="distanciaLL"
        description="Distancia Lente 1 - Lente 2"
        minValue="70"
        maxValue="900"
        step="5"
        unit="mm"
        state={distanciaLL}
        setState={setDistanciaLL}
        helpText={helpText.distanciaLP}
      />
      
      <FormRange 
        name="distanciaLP"
        description="Distancia Lente 2 - Pantalla"
        minValue="70"
        maxValue="970"
        step="5"
        unit="mm"
        state={distanciaLP}
        setState={setDistanciaLP}
        helpText={helpText.distanciaLL}
      />

      <FormSelect
        name="Diafragma"
        values={tipoDiafragma}
        defaultValue={defaultDiafragma}
        setState={setDiafragma}
        helpText={helpText.diaframa}
      />

      <Row>
        { submitActivo ? (
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

        <Col className="text-center">
        <BtnSaveLaboratorio
            idUsuario={idUsuario}
            setSubmitActivo={setSubmitActivo}
            useHook={usePostEnsayoDivergentes}
            distanciaFL={distanciaFL}
            distanciaLL={distanciaLL}
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

export default FormDivergentes
