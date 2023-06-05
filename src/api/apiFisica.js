import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"
import Cookies from 'js-cookie'

// const API = process.env.API_FISICA || "http://localhost:3030/api/teleco"
const API_FISICA = "http://localhost:3032/api/fisica"

//-----------------------------------------------------
// Laboratorios - Fisica
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_FISICA}/${idLaboratorio}`

    const { data } = await axios.get(URL, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}, {
        datos: false,
        idLaboratorio: idLaboratorio,
    })
    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    try {
        const [_, { idLaboratorio, idUsuario }] = queryKey
        const URL = `${API_FISICA}/${idLaboratorio}/${idUsuario}`

        const { data } = await axios.get(URL,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}, {
            datos: false,
            idLaboratorio: idLaboratorio,
            idUsuario: idUsuario,
        })

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

        const { data } = await axios.get(url,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}, {
            datos: false,
            idLaboratorio: idLaboratorio
        })

        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

//-----------------------------------------------------
// Laboratorio - Lentes Convergentes
//-----------------------------------------------------

export const postEnsayoConvergentes = async ({
    idUsuario,
    distanciaFL,
    distanciaLP,
    diafragma,
    setcambio,
    guardar
}) => {
    const newEnsayoConvergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
        guardar:guardar,
        datos: false
    }
    
    process()
    const { data } = await axios.post(
        `${API_FISICA}/convergente`,newEnsayoConvergente,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }})
    
    setcambio(current => !current)
    if (data.msg === "Parámetros correctos. Guardado en DB") {
        submitSuccess("Ensayo Guardado con Exito")
    } else if (data.msg === "Parámetros correctos. ejecutando en arduino") {
        submitSuccess("Ensayo Realizado con Exito")
    }else {
        submitErrorDato(data)
    }
    return data
}

//-----------------------------------------------------
// Laboratorio - Lentes Divergentes
//-----------------------------------------------------

export const postEnsayoDivergentes = async ({
    idUsuario,
    distanciaFL,
    distanciaLL,
    distanciaLP,
    diafragma,
    setcambio,
    guardar
}) => {
    const newEnsayoDivergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLL: parseInt(distanciaLL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
        guardar:guardar,
        datos: false
    }
    process()
    const { data } = await axios.post(`${API_FISICA}/divergente`,newEnsayoDivergente,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }})

    setcambio(current => !current)
    if (data.msg === "Parámetros correctos. Guardado en DB") {
        submitSuccess("Ensayo Guardado con Exito")
    } else if (data.msg === "Parámetros correctos. ejecutando en arduino") {
        submitSuccess("Ensayo Realizado con Exito")
    }else {
        submitErrorDato(data)
    }
    return data
}

export const validarToken = async () => {
    const dat = {
        datos: true,
    }
    const headers ={
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    }
    const respuesta = await axios.post("http://localhost:3032/api/fisica/verificar",dat,headers)
      Cookies.remove('nombreUsuario')
      Cookies.remove('profesor')
      
      Cookies.set('nombreUsuario', respuesta.data['nombreUsuario'])
      Cookies.set('profesor', respuesta.data['profesor'])
    return respuesta.status == 200
  }