import { useMutation, useQuery } from "react-query"

import {
    getInfoLaboratorio,
    getEnsayosUsuario,
    getEnsayos,
    postEnsayoSubmuestreo,
    postEnsayoPosicion
} from "@api/apiControl"

const key = "control"

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
        [key, { idLaboratorio: idLaboratorio }], 
        getEnsayos
    )
}
export function usePostEnsayoSubmuestreo() {
    return useMutation(postEnsayoSubmuestreo)
}

export function usePostEnsayoPosicion() {
    return useMutation(postEnsayoPosicion);
}
