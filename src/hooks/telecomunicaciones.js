import { useMutation, useQuery } from "react-query";

import {
  getInfoLaboratorio,
  getEnsayosUsuario,
  postEnsayoWifi,
  postEnsayoRadio,
} from "../api/telecomunicaciones";

const key = "telecomunicaciones";

export function useInfoLaboratorio(idLabActual) {
  return useQuery([key, { idLaboratorio: idLabActual }], getInfoLaboratorio);
}

/**
 * 
 * @param {number} idLaboratorio 
 * @param {number} idUsuario
 * @returns 
 */
export function useEnsayosUsuario({ idLaboratorio, idUsuario }) {
  return useQuery(
    [key, { idLaboratorio: idLaboratorio, idUsuario: idUsuario }],
    getEnsayosUsuario
  );
}

export function usePostEnsayoWifi() {
  return useMutation(postEnsayoWifi);
}

export function usePostEnsayoRadio() {
  return useMutation(postEnsayoRadio);
}
