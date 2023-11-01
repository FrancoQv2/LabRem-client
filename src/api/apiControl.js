import axios from 'axios'

const API_CONTROL = `${import.meta.env.VITE_URL_LABREM}/api/control`

// -----------------------------------------------------
// Laboratorios - Automatización y Control
// -----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey
  const URL = `${API_CONTROL}/${idLaboratorio}`

  const { data } = await axios.get(URL, {
    idLaboratorio
  })
  console.log(data)

  return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
  try {
    const [_, { idLaboratorio, idUsuario }] = queryKey
    const URL = `${API_CONTROL}/${idLaboratorio}/${idUsuario}`

    const { data } = await axios.get(URL, {
      idLaboratorio,
      idUsuario
    })
    console.log(data)

    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getEnsayos = async ({ queryKey }) => {
  try {
    const [_, { idLaboratorio }] = queryKey
    const URL = `${API_CONTROL}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(URL, {
      idLaboratorio
    })
    console.log(data)

    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

// -----------------------------------------------------
// Laboratorio - Submuestreo
// -----------------------------------------------------

export const postEnsayoSubmuestreo = async ({ idUsuario, frecuenciaAgua, frecuenciaLuz, caidaAgua }) => {
  const newEnsayoSubmuestreo = {
    idUsuario,
    frecuenciaAgua: parseInt(frecuenciaAgua),
    frecuenciaLuz: parseInt(frecuenciaLuz),
    caidaAgua
  }
  console.log(newEnsayoSubmuestreo)

  const response = await axios.post(`${API_CONTROL}/submuestreo`, newEnsayoSubmuestreo)

  return response.data
}

// -----------------------------------------------------
// Laboratorio - Posicion
// -----------------------------------------------------

export const postEnsayoPosicion = async ({
  idUsuario,
  anguloMotor,
  rapidezMotor,
  modificacionesDriver,
  anguloControlador,
  rapidezControlador
}) => {
  const newEnsayoPosicion = {
    idUsuario,
    anguloMotor,
    rapidezMotor: parseInt(rapidezMotor),
    modificacionesDriver,
    anguloControlador,
    rapidezControlador: parseInt(rapidezControlador)
  }
  console.log(newEnsayoPosicion)

  const response = await axios.post(`${API_CONTROL}/posicion`, newEnsayoPosicion)

  return response.data
}
