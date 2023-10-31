import { useQuery, useMutation } from 'react-query'

import { getInfoLaboratorio, getEnsayosUsuario, getEnsayos, postEnsayoWifi, postEnsayoRadio } from '@api/apiTeleco'

const key = 'telecomunicaciones'

export function useInfoLaboratorio(idLaboratorio) {
  return useQuery([key, { idLaboratorio }], getInfoLaboratorio, {
    staleTime: Infinity
  })
}

export function useEnsayosUsuario({ idLaboratorio, idUsuario }, options) {
  return useQuery([key, { idLaboratorio, idUsuario }], getEnsayosUsuario, options)
}

export function useEnsayos({ idLaboratorio }) {
  return useQuery([key, { idLaboratorio }], getEnsayos)
}

export function usePostEnsayoWifi() {
  return useMutation(postEnsayoWifi)
}

export function usePostEnsayoRadio() {
  return useMutation(postEnsayoRadio)
}
