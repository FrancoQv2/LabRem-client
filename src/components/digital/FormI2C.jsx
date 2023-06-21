import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { usePostEnsayoI2C } from "../../hooks/hooksDigital"
import { submitSuccess, submitError } from "../../libs/alerts"

import FormSelect from "../_form/FormSelect"
import FormBtnGroup from "../_form/FormBtnGroup"
import BtnDownloadImage from "../_button/BtnDownloadImage" 
import FormTextHexa from "../_form/FormTextHexa"
import FormTextBinary from "../_form/FormTextBinary"

/**
 * 
 */
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

  const [submitActivo, setSubmitActivo] = useState(true)

  const [accion, setLectura] = useState(defaultAccion)  
  const [frecuencia, setFrecuencia] = useState(defaultFrecuencia)
  const [direccionMemoria, setDireccionMemoria] = useState(defaultDireccionMemoria) 
  const [datos, setDatos] = useState(defaultDatos)

  const [pulsadores, setPulsadores] = useState(defaultPulsadores)

  const { mutate, error, isLoading } = usePostEnsayoI2C()

  // Definicion de textos de ayuda para tooltip

  const helpText = {
    accion:     'Se debe seleccionar si se desea escribir o leer en memoria',
    frecuencia: 'Frecuencia en la que trabaja la comunicación',
    direccion:  'Dirección de memoria en hexadecimal que se desea',
    datosE:     'Datos que se desean guardar, debe ser en formato binario y hasta 8 caracteres',
    pulsadores: 'Manda el comando al pulsador que se desea presionar si se estuviera presencial'
  }

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo(current =>!current)

    mutate(
      { 
        idUsuario, 
        frecuencia, 
        direccionMemoria, 
        accion, 
        datos,
        pulsadores,
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
        }
      }
    )
  }  

  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <FormSelect
        name="Acción a realizar"
        values={valuesAccion}
        defaultValue={defaultAccion}
        setState={setLectura}
        helpText={helpText.accion}
      />

      <FormSelect
        name="Frecuencia [KHz]"
        values={valuesFrecuencia}
        defaultValue={defaultFrecuencia}
        setState={setFrecuencia}
        helpText={helpText.frecuencia}
      />

      <FormTextHexa 
        name="Dirección de Memoria [0x]"
        limit={8}
        state={direccionMemoria}
        setState={setDireccionMemoria}
        helpText={helpText.direccion}
      />

      {accion === valuesAccion[0] ? (
        <FormTextBinary 
          name="Datos a escribir [0b]"
          limit={8}
          state={datos}
          setState={setDatos}
          disabled={true}
          helpText={helpText.datosE}
        />
      ) : (
        <FormTextBinary 
          name="Datos a escribir [0b]"
          limit={8}
          state={datos}
          setState={setDatos}
          helpText={helpText.datosE}
        />
      )}
      
      <FormBtnGroup 
        name="Pulsadores"
        state={pulsadores}
        setState={setPulsadores}
        helpText={helpText.pulsadores}
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

        <Col className="text-center d-grid gap-2">
          <BtnDownloadImage />
        </Col>

      </Row>
    </Form>
  )
}

export default FormI2C
