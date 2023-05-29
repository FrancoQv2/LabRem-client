import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"

const API_TELECO = "http://localhost:3033/api/teleco"

//-----------------------------------------------------
// Laboratorios - Teleco
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_TELECO}/${idLaboratorio}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
    })

    console.log(data);
    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    const [_, { idLaboratorio, idUsuario }] = queryKey

    const URL = `${API_TELECO}/${idLaboratorio}/${idUsuario}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
    })
    console.log(data)

    return data
}

export const getEnsayos = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_TELECO}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio
    })

    return data
}

//-----------------------------------------------------
// Laboratorio - Enlace Wifi
//-----------------------------------------------------

export const postEnsayoWifi = async ({ idUsuario, elevacion, azimut, setcambio }) => {
    const newEnsayoWifi = {
        idUsuario: idUsuario,
        elevacion: parseInt(elevacion),
        azimut: parseInt(azimut),
    }

    process()

    let response
    
    try {
        response = await axios.post(`${API_TELECO}/wifi`, newEnsayoWifi)
        console.log(response)
        console.log(response.data)

        if (response.status === 200) {
            setcambio(current => !current)
            submitSuccess(response.data.msg)
        } else {
            submitErrorDato(response.data.msg)
        }

    } catch (error) {
        console.log(error)
    }

    return response
}

//-----------------------------------------------------
// Laboratorio - Enlace Radio
//-----------------------------------------------------

// export const getEnsayosRadio = async () => {
//     const { data } = await axios.get(`${API_TELECO}/radio`)
//     return data
// }

export const postEnsayoRadio = async ({
    idUsuario,
    modulacion,
    codificacion,
    intensidadMin,
    intensidadMax,
}) => {
    const newEnsayoRadio = {
        idUsuario: idUsuario,
        tipoModulacion: parseInt(modulacion),
        tipoCodificacion: parseInt(codificacion),
        intensidadMin: parseInt(intensidadMin),
        intensidadMax: parseInt(intensidadMax),
    }

    console.log(newEnsayoRadio)

    const { data } = await axios.post(`${API_TELECO}/radio`, newEnsayoRadio)
    console.log(data)
    return data
}
