import axios from 'axios'

const API_FISICA = `${import.meta.env.VITE_URL_LABREM}/api/fisica`

// -----------------------------------------------------
// Laboratorios - Fisica
// -----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey
  const URL = `${API_FISICA}/${idLaboratorio}`

  const { data } = await axios.get(URL, {
    idLaboratorio
  })
  console.log(data)

  return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
  try {
    const [_, { idLaboratorio, idUsuario }] = queryKey
    const URL = `${API_FISICA}/${idLaboratorio}/${idUsuario}`

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
    const url = `${API_FISICA}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(url, {
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
// Laboratorio - Lentes Convergentes
// -----------------------------------------------------

export const postEnsayoConvergentes = async ({ idUsuario, distanciaFL, distanciaLP, diafragma }) => {
  const newEnsayoConvergente = {
    idUsuario,
    distanciaFL: parseInt(distanciaFL),
    distanciaLP: parseInt(distanciaLP),
    diafragma
  }
  console.log(newEnsayoConvergente)

  const response = await axios.post(`${API_FISICA}/convergente`, newEnsayoConvergente)

  return response.data
}

// -----------------------------------------------------
// Laboratorio - Lentes Divergentes
// -----------------------------------------------------

export const postEnsayoDivergentes = async ({ idUsuario, distanciaFL, distanciaLL, distanciaLP, diafragma }) => {
  const newEnsayoDivergente = {
    idUsuario,
    distanciaFL: parseInt(distanciaFL),
    distanciaLL: parseInt(distanciaLL),
    distanciaLP: parseInt(distanciaLP),
    diafragma
  }
  console.log(newEnsayoDivergente)

  const response = await axios.post(`${API_FISICA}/divergente`, newEnsayoDivergente)

  return response.data
}
