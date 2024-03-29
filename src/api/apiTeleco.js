import axios from "axios"

const API_TELECO = "http://localhost:3033/api/teleco"

//-----------------------------------------------------
// Laboratorios - Teleco
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    try {
        
        const [_, { idLaboratorio }] = queryKey
        const URL = `${API_TELECO}/${idLaboratorio}`
        
        const { data } = await axios.get(URL, {
            idLaboratorio: idLaboratorio,
        })
        console.log(data)
        
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    try {
        const [_, { idLaboratorio, idUsuario }] = queryKey
        const URL = `${API_TELECO}/${idLaboratorio}/${idUsuario}`

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
        const URL = `${API_TELECO}/ensayos/${idLaboratorio}`

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
// Laboratorio - Enlace Wifi
//-----------------------------------------------------

export const postEnsayoWifi = async ({ 
    idUsuario, 
    elevacion, 
    azimut 
}) => {
    const newEnsayoWifi = {
        idUsuario:  idUsuario,
        elevacion:  parseInt(elevacion),
        azimut:     parseInt(azimut),
    }
    console.log(newEnsayoWifi)

    const { data } = await axios.post(`${API_TELECO}/wifi`, newEnsayoWifi)
    
    return data

    // process()
    // let response
    // try {
    //     response = await axios.post(`${API_TELECO}/wifi`, newEnsayoWifi)
    //     console.log(response)
    //     console.log(response.data)
    // } catch (error) {
    //     console.log(error)
    // }
    // return response
}

//-----------------------------------------------------
// Laboratorio - Enlace Radio
//-----------------------------------------------------

export const postEnsayoRadio = async ({
    idUsuario,
    modulacion,
    codificacion,
    intensidadMin,
    intensidadMax
}) => {
    const newEnsayoRadio = {
        idUsuario:          idUsuario,
        tipoModulacion:     modulacion,
        tipoCodificacion:   parseInt(codificacion),
        intensidadMin:      parseInt(intensidadMin),
        intensidadMax:      parseInt(intensidadMax),
    }
    console.log(newEnsayoRadio)

    const { data } = await axios.post(`${API_TELECO}/radio`, newEnsayoRadio)
    
    return data
}
