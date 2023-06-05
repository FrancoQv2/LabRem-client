import { useMutation, useQuery } from "react-query"

import {
  getInfoLaboratorio,
  getEnsayosUsuario,
  getEnsayos,
  postEnsayoUART,
  postEnsayoI2C,
  validarToken
} from "../api/apiDigital";

const key = "digital"

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
export function usePostEnsayoUART() {
	return useMutation(postEnsayoUART)
}

export function usePostEnsayoI2C() {
	return useMutation(postEnsayoI2C)
}

export function ValidarToken() {
	return validarToken();
}