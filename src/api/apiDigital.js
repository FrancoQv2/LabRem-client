import axios from "axios"

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
    try {
        const [_, { idLaboratorio, idUsuario }] = queryKey
        const URL = `${API_DIGITAL}/${idLaboratorio}/${idUsuario}`

        const { data } = await axios.get(URL, {
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
            idLaboratorio: idLaboratorio
        })
        console.log(data)

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
    mensaje
}) => {
    const newEnsayoUart = {
        idUsuario:  idUsuario,
        velocidad:  parseInt(velocidad),
        bitsDatos:  bitsDatos,
        bitsParada: bitsParada,
        paridad:    paridad,
        pulsadores: pulsadores,
        mensaje:    mensaje,
        siguiente:  false
    }
    console.log(newEnsayoUart)

    const response = await axios.post(`${API_DIGITAL}/uart`, newEnsayoUart)

    return response.data
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
    pulsadores
}) => {
    const newEnsayo = {
        idUsuario:  idUsuario,
        accion:     accion,
        frecuencia: frecuencia,
        direccion:  direccionMemoria,
        datos:      datos,
        pulsadores: pulsadores,
    }
    
    if (accion === "Escritura") {
        newEnsayo.datos = datos.padStart(8, "0")
    }
    
    console.log(newEnsayo)
    
    const response = await axios.post(`${API_DIGITAL}/i2c`, newEnsayo)

    return response.data
}
