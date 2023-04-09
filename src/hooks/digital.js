import { useMutation, useQuery } from "react-query"

import {
  getInformationLab,
  getEnsayosUsuario,
  getEnsayos,
  postEnsayoUART,
  postEnsayoUARTSave,
  postEnsayoI2C,
} from "../api/digital";

const key = "digital"

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
export function usePostEnsayoUART() {
	return useMutation(postEnsayoUART)
}
export function usePostEnsayoUARTSave() {
	return useMutation(postEnsayoUARTSave);
}
export function usePostEnsayoUARTSave() {
  return useMutation(postEnsayoUARTSave);
}

export function usePostEnsayoI2C() {
	return useMutation(postEnsayoI2C)
}
