import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import FormText from '@components/_form/FormText'
import FormRange from '@components/_form/FormRange'
import FormSelect from '@components/_form/FormSelect'

import BtnDownloadImage from '@components/_button/BtnDownloadImage'
import BtnSaveLaboratorio from '@components/_button/BtnSaveLaboratorio'

import { usePostEnsayoPosicion } from '@hooks/hooksControl'
import { submitSuccess, submitError } from '@libs/alerts'
import FormTooltip from '@components/_form/FormTooltip'

/**
 *
 */
function FormPosicion({ idUsuario }) {
  // Definicion de valores posibles

  const valueDriver = ['Ninguna', 'Retardos', 'No linealidades', 'Polos-ceros extras']
  const defaultDriver = valueDriver[0]

  // Definicion de Hooks

  const [submitActivo, setSubmitActivo] = useState(true)

  const [anguloMotor, setAnguloMotor] = useState(0)
  const [rapidezMotor, setRapidezMotor] = useState('')

  const [modificacionesDriver, setModificacionesDriver] = useState(defaultDriver)

  const [rapidezControlador, setRapidezControlador] = useState('')
  const [anguloControlador, setAnguloControlador] = useState(0)

  const { mutate, error, isLoading } = usePostEnsayoPosicion()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo((current) => !current)

    mutate(
      {
        idUsuario,
        anguloMotor,
        rapidezMotor,
        modificacionesDriver,
        anguloControlador,
        rapidezControlador
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

  // Definicion de textos de ayuda para tooltip

  const helpText = {
    motor: 'Motor',
    driver: 'A la electrónica del driver del motor se le pueden agregar modificaciones por software',
    controlador:
      'El controlador también es configurable por software. Recibe las señales temporales de referencia y de feedback.',
    anguloMotor: 'Posición angular del eje de salida.',
    rapidezMotor: 'Rapidez de cambio del motor.',
    modificacionesDriver: 'Modificaciones que se le pueden agregar al driver.',
    anguloControlador: '-',
    rapidezControlador: '-'
  }

  return (
    <Form className='m-3' onSubmit={handleSubmit}>
      <Container className='border border-secondary rounded px-4 pt-3'>
        <Card.Subtitle>
          <FormTooltip helpText={helpText.motor}></FormTooltip>
          Motor eléctrico y Tren reductor
        </Card.Subtitle>
        <FormRange
          name='elevacion'
          description='Ángulo de Salida'
          minValue='-180'
          maxValue='180'
          step='5'
          unit='°'
          state={anguloMotor}
          setState={setAnguloMotor}
          helpText={helpText.anguloMotor}
        />
        <FormText
          name='Rapidez de cambio'
          limit={100}
          showLimit={false}
          state={rapidezMotor}
          setState={setRapidezMotor}
          helpText={helpText.rapidezMotor}
        />
      </Container>

      <hr />

      <Container className='border border-secondary rounded px-4 pt-3'>
        <Card.Subtitle>
          <FormTooltip helpText={helpText.driver}></FormTooltip>
          Driver del Motor
        </Card.Subtitle>
        <FormSelect
          name='Modificaciones agregadas'
          values={valueDriver}
          defaultValue={defaultDriver}
          setState={setModificacionesDriver}
          helpText={helpText.modificacionesDriver}
        />
      </Container>

      <hr />

      <Container className='border border-secondary rounded px-4 pt-3'>
        <Card.Subtitle>
          <FormTooltip helpText={helpText.controlador}></FormTooltip>
          Controlador
        </Card.Subtitle>
        <FormRange
          name='elevacion'
          description='Ángulo de Salida'
          minValue='-180'
          maxValue='180'
          step='5'
          unit='°'
          state={anguloControlador}
          setState={setAnguloControlador}
          helpText={helpText.anguloControlador}
        />
        <FormText
          name='Rapidez de cambio'
          limit={100}
          showLimit={false}
          state={rapidezControlador}
          setState={setRapidezControlador}
          helpText={helpText.rapidezControlador}
        />
      </Container>

      <Row className='mt-4'>
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

        <Col className='text-center'>
          <BtnSaveLaboratorio
            idUsuario={idUsuario}
            setSubmitActivo={setSubmitActivo}
            useHook={usePostEnsayoPosicion}
            rapidezMotor={rapidezMotor}
            anguloMotor={anguloMotor}
            modificacionesDriver={modificacionesDriver}
            rapidezControlador={rapidezControlador}
            anguloControlador={anguloControlador}
          />
        </Col>

        <Col className='text-center d-grid gap-2'>
          <BtnDownloadImage />
        </Col>
      </Row>
    </Form>
  )
}

export default FormPosicion
