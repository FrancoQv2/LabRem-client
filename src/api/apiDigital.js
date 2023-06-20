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
    const { data } = await axios.get(URL, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }, {
        siguiente: false,
        idLaboratorio: idLaboratorio,
    })

    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    try {
        const [_, { idLaboratorio, idUsuario }] = queryKey
        const URL = `${API_DIGITAL}/${idLaboratorio}/${idUsuario}`

        const { data } = await axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }, {
            siguiente: false,
            idLaboratorio: idLaboratorio,
            idUsuario: idUsuario,
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
        const URL = `${API_DIGITAL}/ensayos/${idLaboratorio}`
        const { data } = await axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }, {
            siguiente: false,
            idLaboratorio: idLaboratorio
        })

        return data
    } catch (error) {
        console.error(error)
        return []
    }
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

    const newEnsayoUart = {
        idUsuario: idUsuario,
        velocidad: parseInt(velocidad),
        bitsDatos: bitsDatos,
        bitsParada: bitsParada,
        paridad: paridad,
        pulsadores: pulsadores,
        mensaje: mensaje,
        siguiente: false
    }

    // process()
    const { data } = await axios.post(`${API_DIGITAL}/uart`, newEnsayoUart, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    setCambio(current => !current)
    if (data.msg === "Parámetros correctos. Guardado en DB") {
        let msj = 'Ensayo Realizado con Exito'
        submitSuccess(msj)
    } else {
        console.log("entra por incorrecto")
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
        idUsuario: idUsuario,
        accion: accion,
        frecuencia: frecuencia,
        direccion: direccionMemoria,
        datos: datos,
        siguiente: false
    }

    if (accion === "Lectura") {
        newEnsayo.datos = "-"
    }

    if (accion === "Escritura") {
        newEnsayo.datos = datos.padStart(8, "0")
    }

    // process()
    const { data } = await axios.post(`${API_DIGITAL}/i2c`, newEnsayo, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    setCambio(current => !current)
    console.log(data)
    if (data === "guardado en base de datos") {
        submitSuccess("realizado con exito")
    } else {
        submitErrorDato(data)
    }

    return data
}

export const validarToken = async () => {
    const dat = {
        siguiente: true
    }
    const headers = {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    }
    const respuesta = await axios.post("http://localhost:3034/api/digital/verificar", dat, headers)
    return respuesta.status == 200
}
