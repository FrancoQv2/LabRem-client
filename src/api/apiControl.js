import axios from "axios"
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts"

const API_CONTROL = "http://localhost:3031/api/control"

//-----------------------------------------------------
// Laboratorios - Control
//-----------------------------------------------------

export const getInfoLaboratorio = async ({ queryKey }) => {
	const [_, { idLaboratorio }] = queryKey
	const { data } = await axios.get(`${API_CONTROL}/${idLaboratorio}`, {
		idLaboratorio: idLaboratorio,
	})
	return data
}

export const getEnsayosUsuario = async ({ queryKey }) => {
    try {
        const [_, { idLaboratorio, idUsuario }] = queryKey
        const URL = `${API_CONTROL}/${idLaboratorio}/${idUsuario}`
        
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

	const URL = `${API_CONTROL}/ensayos/${idLaboratorio}`

	const { data } = await axios.get(URL, {
		idLaboratorio: idLaboratorio
	})

	return data
} catch (error) {
	console.error(error)
	return []
}
}

export const postEnsayoSubmuestreo = async ({
	idUsuario,
	frecuenciaAgua,
	frecuenciaLuz,
	caidaAgua,
	setCambio
}) => {
	const newEnsayoSubmuestreo = {
		idUsuario: 		idUsuario,
		frecuenciaAgua: parseInt(frecuenciaAgua),
		frecuenciaLuz: 	parseInt(frecuenciaLuz),
		caidaAgua: 		caidaAgua
	}
	console.log(newEnsayoSubmuestreo)

	process()
	const { data } = await axios.post(`${API_CONTROL}/submuestreo`, newEnsayoSubmuestreo)
	setCambio(current => !current)
	
	if (data === "laboratorio ok") {
		submitSuccess()
	} else {
		submitErrorDato(data)
	}
	return data
}

export const postEnsayoSubmuestreoSave = async ({
	idUsuario,
	frecuenciaAgua,
	frecuenciaLuz,
	caidaAgua
}) => {
	const newEnsayoSubmuestreo = {
		idUsuario: 		idUsuario,
		frecuenciaAgua: parseInt(frecuenciaAgua),
		frecuenciaLuz: 	parseInt(frecuenciaLuz),
		caidaAgua: 		caidaAgua
	}

	const { data } = await axios.post(`${API_CONTROL}/estroboscopicosave`, newEnsayoSubmuestreo)
	if (data === "guardado en base de datos") {
		saveSuccess()
	} else {
		submitErrorDato(data)
	}
	return data
}

export const postEnsayoPosicion = async ({
	idUsuario,
	rapidezMotor,
	anguloMotor,
	modificacionesDriver,
	rapidezControlador,
	anguloControlador,
	setCambio
}) => {
	const newEnsayoPosicion = {
		idUsuario: 		      idUsuario,
		rapidezMotor: 	      parseInt(rapidezMotor),
		anguloMotor: 	      anguloMotor,
		modificacionesDriver: modificacionesDriver,
		rapidezControlador:   parseInt(rapidezControlador),
		anguloControlador: 	  anguloControlador
	}
	// process()
	const { data } = await axios.post(`${API_CONTROL}/posicion`, newEnsayoPosicion)
	setCambio(current => !current)
	
	if (data === "laboratorio ok") {
		submitSuccess()
	} else {
		submitErrorDato(data)
	}
	return data
}

export const postEnsayoPosicionSave = async ({
	idUsuario,
	rapidezMotor,
	anguloMotor,
	modificacionesDriver,
	rapidezControlador,
	anguloControlador,
}) => {
	const newEnsayoPosicion = {
		idUsuario: 		      idUsuario,
		rapidezMotor: 	      parseInt(rapidezMotor),
		anguloMotor: 	      anguloMotor,
		modificacionesDriver: modificacionesDriver,
		rapidezControlador:   parseInt(rapidezControlador),
		anguloControlador: 	  anguloControlador
	}

	const { data } = await axios.post(`${API_CONTROL}/posicionsave`, newEnsayoPosicion)
	if (data === "guardado en base de datos") {
		saveSuccess()
	} else {
		submitErrorDato(data)
	}
	return data
}
