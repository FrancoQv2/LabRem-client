import { useMutation, useQuery } from "react-query"

import {
  getInfoLaboratorio,
  getEnsayosUsuario,
  getEnsayos,
  postEnsayoUART,
//   postEnsayoUARTSave,
  postEnsayoI2C,
//   postEnsayoI2CSave,
} from "../api/digital";

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

// export function usePostEnsayoUARTSave() {
// 	return useMutation(postEnsayoUARTSave);
// }

export function usePostEnsayoI2C() {
	return useMutation(postEnsayoI2C)
}

// export function usePostEnsayoI2CSave() {
// 	return useMutation(postEnsayoI2CSave)
// }

