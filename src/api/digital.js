import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"

const API_DIGITAL = "http://localhost:3034/api/digital"

//-----------------------------------------------------
// Laboratorios - Sistemas Digitales
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_DIGITAL}/${idLaboratorio}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
    })
    console.log(data)
    
    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    const [_, { idLaboratorio, idUsuario }] = queryKey

    const URL = `${API_DIGITAL}/${idLaboratorio}/${idUsuario}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
    })
    console.log(data)

    return data
}

export const getEnsayos = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_DIGITAL}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(URL, {
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
    }

    console.log(newEnsayo)

    process()

    const { data } = await axios.post(`${API_DIGITAL}/uart`, newEnsayo)

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
