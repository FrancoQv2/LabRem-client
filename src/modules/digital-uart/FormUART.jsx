import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { usePostEnsayoUART } from '@hooks/hooksDigital'
import { submitSuccess, submitError } from '@libs/alerts'

import FormText from '@components/_form/FormText'
import FormSelect from '@components/_form/FormSelect'
import FormBtnGroup from '@components/_form/FormBtnGroup'
import BtnDownloadImage from '@components/_button/BtnDownloadImage'
import FileUpload from '../../components/common/FileUpload'

/**
 *
 */
function FormUART({ idUsuario }) {
  const API_DIGITAL = import.meta.env.VITE_API_DIGITAL

  // Definicion de valores de variables

  const valuesVelocidad = [300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600] // bps
  const defaultVelocidad = valuesVelocidad[5]

  const valuesBitsDatos = [5, 6, 7, 8, 9]
  const defaultBitsDatos = valuesBitsDatos[2]

  const valuesParidad = ['Par', 'Impar']
  const defaultParidad = valuesParidad[0]

  const valuesBitsParada = [1, 2]
  const defaultBitsParada = valuesBitsParada[0]

  const defaultPulsadores = [0, 0, 0, 0]

  const defaultMensaje = ''

  // Definicion de Hooks

  const [velocidad, setVelocidad] = useState(defaultVelocidad)
  const [bitsDatos, setBitsDatos] = useState(defaultBitsDatos)
  const [paridad, setParidad] = useState(defaultParidad)
  const [bitsParada, setBitsParada] = useState(defaultBitsParada)
  const [pulsadores, setPulsadores] = useState(defaultPulsadores)
  const [mensaje, setMensaje] = useState(defaultMensaje)

  const { mutate, error, isLoading } = usePostEnsayoUART()

  const [submitActivo, setSubmitActivo] = useState(true)

  // Definicion de textos de ayuda para tooltip

  const helpText = {
    velocidad: 'Velocidad de comunicacion',
    bitsDatos: 'Cantidad de bits de los datos',
    parada: 'Cantidad de bits de parada',
    paridad: 'Indica si es una cantidad par o impar de bits',
    pulsadores: 'Manda el comando al pulsador que se desea presionar si se estuviera presencial',
    text: 'Texto que se desea enviar para pruebas'
  }

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo((current) => !current)

    mutate(
      {
        idUsuario,
        velocidad,
        bitsDatos,
        bitsParada,
        paridad,
        pulsadores,
        mensaje
      },
      {
        onSuccess: (e) => {
          setTimeout(() => {
            setSubmitActivo((current) => !current)
          }, 5000)

          submitSuccess(e)
        },
        onError: (e) => {
          setTimeout(() => {
            setSubmitActivo((current) => !current)
          }, 5000)

          submitError(e.response.data)
        }
      }
    )
  }

  return (
    // <FileUpload URL={`${API_DIGITAL}/upload`}/>

    <Form className='m-3' onSubmit={handleSubmit}>
      <FormSelect
        name='Velocidad'
        values={valuesVelocidad}
        defaultValue={defaultVelocidad}
        setState={setVelocidad}
        helpText={helpText.velocidad}
      />

      <FormSelect
        name='Cantidad de Bits de Datos'
        values={valuesBitsDatos}
        defaultValue={defaultBitsDatos}
        setState={setBitsDatos}
        helpText={helpText.bitsDatos}
      />

      <FormSelect
        name='Cantidad de Bits de Parada'
        values={valuesBitsParada}
        defaultValue={defaultBitsParada}
        setState={setBitsParada}
        helpText={helpText.parada}
      />

      <FormSelect
        name='Tipo de Paridad'
        values={valuesParidad}
        defaultValue={defaultParidad}
        setState={setParidad}
        helpText={helpText.paridad}
      />

      <FormBtnGroup name='Pulsadores' state={pulsadores} setState={setPulsadores} helpText={helpText.pulsadores} />

      <FormText name='Cadena a transmitir' limit={100} state={mensaje} setState={setMensaje} helpText={helpText.text} />

      <Row>
        {submitActivo ? (
          <Col className='text-center d-grid gap-2'>
            <Button variant='primary' type='submit'>
              Iniciar ensayo
            </Button>
          </Col>
        ) : (
          <Col className='text-center d-grid gap-2'>
            <Button disabled variant='primary' type='submit'>
              Iniciar ensayo
            </Button>
          </Col>
        )}

        <Col className='text-center d-grid gap-2'>
          <BtnDownloadImage />
        </Col>
      </Row>
    </Form>
  )
}

export default FormUART
