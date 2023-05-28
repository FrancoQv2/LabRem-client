import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "../common/FormSelect"
import FormRange from "../common/FormRange"

import { usePostEnsayoDivergentes } from "../../hooks/fisica"
import { submitSuccess, submitError } from "../../libs/alerts"

import FormSaveDivergente from "./FormSaveDivergente"
import BtnDownloadImage from "../common/BtnDownloadImage"

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
  const [cambio, setcambio] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setcambio(current => !current)

    mutate(
      { idUsuario, distanciaFL, distanciaLL, distanciaLP, diafragma, setcambio },
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
      <FormRange 
        name="distanciaFL"
        description="Distancia Foco - Lente 1"
        minValue="50"
        maxValue="920"
        step="5"
        unit="mm"
        state={distanciaFL}
        setState={setDistanciaFL}
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
      />

      <FormSelect
        name="Diafragma"
        values={tipoDiafragma}
        defaultValue={defaultDiafragma}
        setState={setDiafragma}
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

        {/* <Col className="text-center">
          <FormSaveDivergente
            idUsuario={idUsuario}
            distanciaFL={distanciaFL}
            distanciaLL={distanciaLL}
            distanciaLP={distanciaLP}
            diafragma={diafragma}
          />
        </Col> */}

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>
        
      </Row>
    </Form>
  )
}

export default FormDivergentes
