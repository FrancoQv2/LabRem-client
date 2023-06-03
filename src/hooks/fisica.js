import { useMutation, useQuery } from "react-query"

import {
  getInfoLaboratorio,
  getEnsayosUsuario,
  getEnsayos,
  postEnsayoConvergentes,
  postEnsayoDivergentes,
  postEnsayoDivergentesSave,
  validarToken
} from "../api/fisica";

const key = "fisica"

export function useInfoLaboratorio(idLabActual) {
	return useQuery([key, { idLaboratorio: idLabActual }], getInfoLaboratorio)
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
export function usePostEnsayoDivergentesSave() {
	return useMutation(postEnsayoDivergentesSave);
}

export function ValidarToken() {
	return validarToken();
}