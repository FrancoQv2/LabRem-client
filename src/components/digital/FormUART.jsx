import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { usePostEnsayoUART } from "../../hooks/digital"
import { submitSuccess, submitError } from "../../libs/alerts"

import FormText from "../common/FormText"
import FormSelect from "../common/FormSelect"
import FormBtnGroup from "../common/FormBtnGroup"
import BtnDownloadImage from "../common/BtnDownloadImage"

function FormUART({ idUsuario }) {

  // Definicion de valores de variables

  const valuesVelocidad = [ 300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600 ] // bps
  const defaultVelocidad = valuesVelocidad[5]
  
  const valuesBitsDatos = [5,6,7,8,9]
  const defaultBitsDatos = valuesBitsDatos[2]
  
  const valuesParidad = ["Par","Impar"]
  const defaultParidad = valuesParidad[0]
  
  const valuesBitsParada = [1,2]
  const defaultBitsParada = valuesBitsParada[0]
  
  const defaultPulsadores = [0, 0, 0, 0]
  
  const defaultMensaje = ""
  
  // Definicion de Hooks

  const [cambio, setCambio] = useState(true)

  const [velocidad, setVelocidad] = useState(defaultVelocidad)
  const [bitsDatos, setBitsDatos] = useState(defaultBitsDatos)
  const [paridad, setParidad] = useState(defaultParidad)
  const [bitsParada, setBitsParada] = useState(defaultBitsParada)
  const [pulsadores, setPulsadores] = useState(defaultPulsadores)
  const [mensaje, setMensaje] = useState(defaultMensaje)

  const { mutate, error, isLoading } = usePostEnsayoUART()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCambio(current => !current)

    mutate({ idUsuario, velocidad, bitsDatos, bitsParada, paridad, pulsadores, mensaje, setCambio},
      {
        onSuccess: () => {
          setMensaje("")
          submitSuccess()
        },
        onError: () => {
          submitError()
        },
      }
    )
  }
 
  const informacion = {
    velocidad: 'velocidad de comunicacion',
    CantBitDatos: 'cantidad de bits de los datos',
    parada: 'cantidad de bits de parada',
    paridad: 'indica si es una cantidad par o impar de bits',
    pulsadores: 'manda el comando al pulsador que se desea presionar si se estuviera presencial',
    text: 'texto que se desea enviar para pruebas'
  }
  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <FormSelect
        name="Velocidad"
        values={valuesVelocidad}
        defaultValue={defaultVelocidad}
        setState={setVelocidad}
        ayuda={informacion.velocidad}
      />

      <FormSelect
        name="Cantidad de Bits de Datos"
        values={valuesBitsDatos}
        defaultValue={defaultBitsDatos}
        setState={setBitsDatos}
        ayuda={informacion.CantBitDatos}
      />

      <FormSelect
        name="Cantidad de Bits de Parada"
        values={valuesBitsParada}
        defaultValue={defaultBitsParada}
        setState={setBitsParada}
        ayuda={informacion.parada}
      />

      <FormSelect
        name="Tipo de Paridad"
        values={valuesParidad}
        defaultValue={defaultParidad}
        setState={setParidad}
        ayuda={informacion.paridad}
      />

      <FormBtnGroup 
        name="Pulsadores"
        state={pulsadores}
        setState={setPulsadores}
        ayuda={informacion.pulsadores}
      />

      <FormText 
        name="Cadena a transmitir"
        limit={100}
        state={mensaje}
        setState={setMensaje}
        ayuda={informacion.text}
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

export default FormUART
