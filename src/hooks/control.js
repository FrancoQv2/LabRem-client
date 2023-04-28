import { useMutation, useQuery } from "react-query"

import {
    getInformationLab,
    getEnsayosUsuario,
    getEnsayos,
    postEnsayoEstroboscopica,
    postEnsayoEstroboscopicaSave,
    postEnsayoPosicion,
    postEnsayoPosicionSave
} from "../api/control"

const key = "control"

export function useInformationLab(idLabActual) {
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
export function usePostEnsayoEstroboscopica() {
    return useMutation(postEnsayoEstroboscopica)
}
export function usePostEnsayoEstroboscopicaSave() {
    return useMutation(postEnsayoEstroboscopicaSave)
}
export function usePostEnsayoPosicion() {
  return useMutation(postEnsayoPosicion);
}
export function usePostEnsayoPosicionSave() {
    return useMutation(postEnsayoPosicionSave);
  }
