import { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FormRange from '@components/_form/FormRange'
import FormSelect from '@components/_form/FormSelect'

import BtnDownloadImage from '@components/_button/BtnDownloadImage'
import BtnSaveLaboratorio from '@components/_button/BtnSaveLaboratorio'

import { usePostEnsayoPosicion } from '@hooks/hooksControl'
import { submitSuccess, submitError } from '@libs/alerts'

/**
 *
 */
function FormPosicion({ idUsuario }) {
  // Definicion de valores posibles

  const valuesInit = [0, 1]
  const defaultInit = valuesInit[0]

  const valuesPerturbar = [0, 1]
  const defaultPerturbar = valuesPerturbar[0]

  // Definicion de Hooks

  const [submitActivo, setSubmitActivo] = useState(true)

  const [kp, setKp] = useState(0)
  const [ki, setKi] = useState(0)
  const [kd, setKd] = useState(0)
  const [init, setInit] = useState(defaultInit)
  const [perturbar, setPerturbar] = useState(defaultPerturbar)

  const { mutate, error, isLoading } = usePostEnsayoPosicion()

  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo((current) => !current)

    mutate(
      {
        idUsuario,
        kp,
        ki,
        kd,
        init,
        perturbar
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
    kp: 'Constante de sintonización Kp',
    ki: 'Constante de sintonización Ki',
    kd: 'Constante de sintonización Kd',
    init: 'Iniciar/Parar ensayo',
    perturbar: 'Perturbar sistema'
  }

  return (
    <Form className='m-3' onSubmit={handleSubmit}>
      <FormRange
        name='kp'
        description='Constante Kp'
        minValue='0'
        maxValue='25'
        step='0.5'
        unit='-'
        state={kp}
        setState={setKp}
        helpText={helpText.kp}
      />

      <FormRange
        name='ki'
        description='Constante Ki'
        minValue='0'
        maxValue='25'
        step='0.5'
        unit='-'
        state={ki}
        setState={setKi}
        helpText={helpText.ki}
      />

      <FormRange
        name='kd'
        description='Constante Kd'
        minValue='0'
        maxValue='25'
        step='0.5'
        unit='-'
        state={kd}
        setState={setKd}
        helpText={helpText.kd}
      />

      <FormSelect
        name='Iniciar/Parar ensayo'
        values={valuesInit}
        defaultValue={defaultInit}
        setState={setInit}
        helpText={helpText.init}
      />

      <FormSelect
        name='Perturbar sistema'
        values={valuesPerturbar}
        defaultValue={defaultPerturbar}
        setState={setPerturbar}
        helpText={helpText.perturbar}
      />

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
            kp={kp}
            ki={ki}
            kd={kd}
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
