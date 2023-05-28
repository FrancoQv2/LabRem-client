import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"

// const API = process.env.API_FISICA || "http://localhost:3030/api/teleco"
const API_FISICA = "http://localhost:3032/api/fisica"

//-----------------------------------------------------
// Laboratorios - Fisica
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const URL = `${API_FISICA}/${idLaboratorio}`

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
    })
    return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    const [_, { idLaboratorio, idUsuario }] = queryKey

    const URL = `${API_FISICA}/${idLaboratorio}/${idUsuario}`
    console.log(idLaboratorio, idUsuario)

    const { data } = await axios.get(URL, {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
    })
    console.log(data)

    return data
}

export const getEnsayos = async ({ queryKey }) => {
    const [_, { idLaboratorio }] = queryKey

    const url = `${API_FISICA}/ensayos/${idLaboratorio}`

    const { data } = await axios.get(url, {
        idLaboratorio: idLaboratorio
    })

    return data
}

//-----------------------------------------------------
// Laboratorio - Lentes Convergentes
//-----------------------------------------------------

export const postEnsayoConvergentes = async ({
    idUsuario,
    distanciaFL,
    distanciaLP,
    diafragma,
    setcambio
}) => {
    const newEnsayoConvergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
    }
    process()
    const { data } = await axios.post(
        `${API_FISICA}/convergente`,
        newEnsayoConvergente
    )
    console.log(data)
    setcambio(current => !current)
    if (data === "laboratorio ok") {
        submitSuccess()
    } else {
        submitErrorDato(data)
    }
    return data
}

export const postEnsayoConvergentesSave = async ({
    idUsuario,
    distanciaFL,
    distanciaLP,
    diafragma
}) => {
    const newEnsayoConvergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
    }
    const { data } = await axios.post(
        `${API_FISICA}/convergentesave`,
        newEnsayoConvergente
    )
    if (data === "guardado en base de datos") {
        saveSuccess()
    } else {
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
}) => {
    const newEnsayoDivergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLL: parseInt(distanciaLL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
    }
    process()
    const { data } = await axios.post(`${API_FISICA}/divergente`, newEnsayoDivergente)

    setcambio(current => !current)
    if (data === "laboratorio ok") {
        submitSuccess()
    } else {
        submitErrorDato(data)
    }
    return data
}

export const postEnsayoDivergentesSave = async ({
    idUsuario,
    distanciaFL,
    distanciaLL,
    distanciaLP,
    diafragma,
}) => {
    const newEnsayoDivergente = {
        idUsuario: idUsuario,
        distanciaFL: parseInt(distanciaFL),
        distanciaLL: parseInt(distanciaLL),
        distanciaLP: parseInt(distanciaLP),
        diafragma: diafragma,
    }
    const { data } = await axios.post(
        `${API_FISICA}/divergentesave`,
        newEnsayoDivergente
    )

    if (data === "guardado en base de datos") {
        saveSuccess()
    } else {
        submitErrorDato(data)
    }
    return data
}