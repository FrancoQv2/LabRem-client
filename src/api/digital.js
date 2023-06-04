import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"
import Cookies from 'js-cookie'

const API_DIGITAL = "http://localhost:3034/api/digital"

//-----------------------------------------------------
// Laboratorios - Sistemas Digitales
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_DIGITAL}/${idLaboratorio}`

    const { data } = await axios.get(URL, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}, {
        idLaboratorio: idLaboratorio,
    })
    console.log(data)
    
    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    const [_, { idLaboratorio, idUsuario }] = queryKey

    const URL = `${API_DIGITAL}/${idLaboratorio}/${idUsuario}`

    const { data } = await axios.get(URL, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}, {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
    })
    console.log(data)

    return data
}

export const getEnsayos = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_DIGITAL}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(URL, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }}, {
        idLaboratorio: idLaboratorio
    })

    return data
}

//-----------------------------------------------------
// Laboratorio - UART
//-----------------------------------------------------

export const postEnsayoUART = async ({
    idUsuario,
    velocidad,
    bitsDatos,
    paridad,
    bitsParada,
    pulsadores,
    mensaje,
    setCambio,
}) => {

    const newEnsayo = {
        idUsuario:  idUsuario,
        velocidad:  parseInt(velocidad),
        bitsDatos:  bitsDatos,
        bitsParada: bitsParada,
        paridad:    paridad,
        pulsadores: pulsadores,
        mensaje:    mensaje,
        datos: false
    }

    console.log(newEnsayo)

    process()

    const { data } = await axios.post(`${API_DIGITAL}/uart`, newEnsayo,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }})

    setCambio(current => !current)

    if (data === "laboratorio ok") {
        submitSuccess()
    } else {
        submitErrorDato(data)
    }
    return data
}

//-----------------------------------------------------
// Laboratorio - I2C
//-----------------------------------------------------

export const postEnsayoI2C = async ({
    idUsuario,
    frecuencia,
    direccionMemoria,
    accion,
    datos,
    setCambio
}) => {
    let newEnsayo = {
        idUsuario:  idUsuario,
        accion:     accion,
        frecuencia: frecuencia,
        direccion:    direccionMemoria,
    }

    if (accion === "Lectura") {
        newEnsayo.datos = "-"
    }

    if (accion === "Escritura") {
        newEnsayo.datos = datos.padStart(8, "0")
    }

    // process()
    const { data } = await axios.post(`${API_DIGITAL}/i2c`, newEnsayo)

    setCambio(current => !current)

    if (data === "laboratorio ok") {
        submitSuccess()
    } else {
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