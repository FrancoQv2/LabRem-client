import { useMutation, useQuery } from "react-query"

import {
    getInfoLaboratorio,
    getEnsayosUsuario,
    getEnsayos,
    postEnsayoWifi,
    postEnsayoRadio
} from "../api/telecomunicaciones"

const key = "telecomunicaciones"

export function useInfoLaboratorio(idLaboratorio) {
    return useQuery([key, { idLaboratorio: idLaboratorio }], getInfoLaboratorio)
}

export function useEnsayosUsuario({ idLaboratorio, idUsuario }, options) {
    return useQuery(
        [key, { idLaboratorio: idLaboratorio, idUsuario: idUsuario }],
        getEnsayosUsuario,
        options
    )
}

export function useEnsayos({ idLaboratorio }) {
    return useQuery(
        [key, { idLaboratorio: idLaboratorio }], getEnsayos)
}

export function usePostEnsayoWifi() {
    return useMutation(postEnsayoWifi)
}

export function usePostEnsayoRadio() {
    return useMutation(postEnsayoRadio)
}
