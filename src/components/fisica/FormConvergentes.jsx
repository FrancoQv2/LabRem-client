import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "../common/FormSelect"
import FormRange from "../common/FormRange"

import { usePostEnsayoConvergentes } from "../../hooks/fisica"
import { submitSuccess, submitError } from "../../libs/alerts" 

import FormSaveConvergente from "./FormSaveConvergente"
import BtnDownloadImage from "../common/BtnDownloadImage"

/**
 * 
 */
function FormConvergentes({ idUsuario }) {
  const tipoDiafragma = ["Sin diafragma","Central","Periférico","Filtro rojo"] 
  const defaultDiafragma = tipoDiafragma[0]
  
  const [distanciaFL, setDistanciaFL] = useState(120)
  const [distanciaLP, setDistanciaLP] = useState(70)
  const [diafragma, setDiafragma] = useState(defaultDiafragma)
  
  const { mutate, error, isLoading } = usePostEnsayoConvergentes()
  const [cambio,setcambio] =useState(true)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setcambio(current =>!current)
    const guardar = false
    mutate(
      { idUsuario, distanciaFL, distanciaLP, diafragma, setcambio,guardar },
      {
        onSuccess: () => {
         console.log(distanciaFL)
        },
        onError: () => {
          submitError()
        },
      }
    )
  }

  const informacion = {
    distanciaLente: 'distancia entre el lente y el foco',
    distanciaPantalla: 'distancia entre el lente y la pantalla',
    diaframa: 'objeto utilizado para corregir aberraciones de la lentes'
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
        ayuda={informacion.distanciaLente}
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
        ayuda={informacion.distanciaPantalla}
      />

      <FormSelect
        name="Diafragma"
        values={tipoDiafragma}
        defaultValue={defaultDiafragma}
        setState={setDiafragma}
        ayuda={informacion.diaframa}
      />

      <Row>
        { cambio ? (
          <Col className="text-center d-grid gap-2">
            <Button variant="primary" type="submit">
              Iniciar ensayo
            </Button>
          </Col>
        ) :null }
        
        <Col className="text-center">
          <FormSaveConvergente
            idUsuario={idUsuario}
            distanciaFL={distanciaFL}
            distanciaLP={distanciaLP}
            diafragma={diafragma}
            setcambio={setcambio}
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
