import { useState } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import FormSelect from "@components/_form/FormSelect"
import BtnDownloadImage from "@components/_button/BtnDownloadImage"

import { usePostEnsayoRadio } from "@hooks/hooksTeleco"
import { submitSuccess, submitError } from "@libs/alerts"

/**
 * 
 */
function FormRadio({ idUsuario }) {
  const tipoModulacion = ["4-QAM", "8-QAM", "16-QAM", "PSK", "FSK", "QPSK"]
  const defaultTipoModulacion = tipoModulacion[4]

  const tipoCodificacion = ["-",1,2,3]
  const defaultTipoCodificacion = tipoCodificacion[0]

  const tipoIntensidadMin = ["-",10,15,20,25]
  const defaultIntensidadMin = tipoIntensidadMin[0]

  const tipoIntensidadMax = ["-",50,80,100,120]
  const defaultIntensidadMax = tipoIntensidadMax[0]

  const [submitActivo, setSubmitActivo] = useState(true)

  const [modulacion, setModulacion] = useState(defaultTipoModulacion)
  const [codificacion, setCodificacion] = useState(defaultTipoCodificacion)
  const [intensidadMin, setIntensidadMin] = useState(defaultIntensidadMin)
  const [intensidadMax, setIntensidadMax] = useState(defaultIntensidadMax)

  const { mutate, error, isLoading } = usePostEnsayoRadio()

  // Definicion de textos de ayuda para tooltip

  const helpText = {
    modulacion:     'Es la modulación en ampliturd, frecuencia o fase establecida para la comunicación.',
    codificacion:   'Tipo codificación que utiliza la comunicación',
    intensidadMin:  'Potencia mínima a utilizar por el transmisor.',
    intensidadMax:  'Potencia máxima a utilizar por el transmisor.',
  }
  
  // Definicion de funciones Handle

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitActivo(current =>!current)

    mutate(
      {
        idUsuario,
        modulacion,
        codificacion,
        intensidadMin,
        intensidadMax
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
        name="Tipo de Modulación"
        values={tipoModulacion}
        defaultValue={defaultTipoModulacion}
        setState={setModulacion}
        helpText={helpText.modulacion}
      />

      <FormSelect
        name="Tipo de Codificación"
        values={tipoCodificacion}
        defaultValue={defaultTipoCodificacion}
        setState={setCodificacion}
        helpText={helpText.codificacion}
      />

      <FormSelect
        name="Intensidad Mínima [ dBm ]"
        values={tipoIntensidadMin}
        defaultValue={defaultIntensidadMin}
        setState={setIntensidadMin}
        helpText={helpText.intensidadMin}
      />

      <FormSelect
        name="Intensidad Máxima [ dBm ]"
        values={tipoIntensidadMax}
        defaultValue={defaultIntensidadMax}
        setState={setIntensidadMax}
        helpText={helpText.intensidadMax}
      />

      <Row>
        {submitActivo ? (
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
        )}
      </Row>
    </Form>
  )
}

export default FormRadio
