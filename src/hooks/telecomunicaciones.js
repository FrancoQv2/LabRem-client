import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getInformationLab,
  getEnsayosUsuario,
  postEnsayoWifi,
  postEnsayoRadio,
} from "../api/telecomunicaciones";

const key = "telecomunicaciones";

export function useInformationLab(idLabActual) {
  return useQuery([key, { idLaboratorio: idLabActual }], getInformationLab);
}

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
