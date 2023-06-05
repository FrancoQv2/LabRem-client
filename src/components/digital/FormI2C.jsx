import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { usePostEnsayoI2C } from "../../hooks/hooksDigital"
import { submitSuccess, submitError } from "../../libs/alerts"

import FormSelect from "../common/FormSelect"
import FormBtnGroup from "../common/FormBtnGroup"
import BtnDownloadImage from "../common/BtnDownloadImage" 
import FormTextHexa from "../common/FormTextHexa"
import FormTextBinary from "../common/FormTextBinary"

function FormI2C({ idUsuario }) {

  // Definicion de valores de variables

  const valuesAccion = ["Lectura","Escritura"]
  const defaultAccion = valuesAccion[0]

  const valuesFrecuencia = [ 100, 400, 1000 ] // KHz
  const defaultFrecuencia = valuesFrecuencia[0]

  const defaultPulsadores = [0, 0, 0, 0]

  const defaultDireccionMemoria = ""
  const defaultDatos = ""

  // Definicion de Hooks

  const [cambio, setCambio] = useState(true)

  const [accion, setLectura] = useState(defaultAccion)  
  const [frecuencia, setFrecuencia] = useState(defaultFrecuencia)
  const [direccionMemoria, setDireccionMemoria] = useState(defaultDireccionMemoria) 
  const [datos, setDatos] = useState(defaultDatos)

  const [pulsadores, setPulsadores] = useState(defaultPulsadores)

  const { mutate, error, isLoading } = usePostEnsayoI2C()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCambio(current =>!current)
    mutate(
      { idUsuario, frecuencia, direccionMemoria, accion, datos, setCambio },
      {
        onSuccess: () => {
          
        },
        onError: () => {
          submitError()
        },
      }
    )
  }

  const informacion = {
    accion: 'se debe seleccionar si se desea escribir o leer en memoria',
    frecuencia: 'frecuencia en la que trabaja la comunicacion',
    direccion: 'direccion de memoria en hexadecimal que se desea',
    datosE: 'datos que se desean guardar, tiene que estar en binario y hasta 8 caracteres',
    pulsadores: 'manda el comando al pulsador que se desea presionar si se estuviera presencial',
    
  }
  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <FormSelect
        name="Acción a realizar"
        values={valuesAccion}
        defaultValue={defaultAccion}
        setState={setLectura}
        ayuda={informacion.accion}
      />

      <FormSelect
        name="Frecuencia [KHz]"
        values={valuesFrecuencia}
        defaultValue={defaultFrecuencia}
        setState={setFrecuencia}
        ayuda={informacion.frecuencia}
      />

      <FormTextHexa 
        name="Dirección de Memoria [0x]"
        limit={8}
        state={direccionMemoria}
        setState={setDireccionMemoria}
        ayuda={informacion.direccion}
      />

      {accion === valuesAccion[0] ? (
        <FormTextBinary 
          name="Datos a escribir [0b]"
          limit={8}
          state={datos}
          setState={setDatos}
          disabled={true}
          ayuda={informacion.datosE}
        />
      ) : (
        <FormTextBinary 
          name="Datos a escribir [0b]"
          limit={8}
          state={datos}
          setState={setDatos}
          ayuda={informacion.datosE}
        />
      )}
      
      <FormBtnGroup 
        name="Pulsadores"
        state={pulsadores}
        setState={setPulsadores}
        ayuda={informacion.pulsadores}
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

export default FormI2C
