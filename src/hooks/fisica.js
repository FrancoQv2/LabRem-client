import { useMutation, useQuery } from "react-query"

import {
	getInformationLab,
	getEnsayosUsuario,
	getEnsayos,
	postEnsayoConvergentes,
	postEnsayoDivergentes,
} from "../api/fisica"

const key = "fisica"

export function useInfoLaboratorio(idLabActual) {
	return useQuery([key, { idLaboratorio: idLabActual }], getInformationLab)
}

export function useEnsayosUsuario({ idLaboratorio, idUsuario }) {
	return useQuery(
		[key, { idLaboratorio: idLaboratorio, idUsuario: idUsuario }],
		getEnsayosUsuario
	)
}
export function useEnsayos({ idLaboratorio }) {
	return useQuery(
		[key, { idLaboratorio: idLaboratorio }], getEnsayos)
}
export function usePostEnsayoConvergentes() {
	return useMutation(postEnsayoConvergentes)
}

export function usePostEnsayoDivergentes() {
	return useMutation(postEnsayoDivergentes)
}
