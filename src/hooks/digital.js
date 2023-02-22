import { useMutation, useQuery } from "react-query";

import {
  getInformationLab,
  getEnsayosUsuario,
  postEnsayoUART,
  postEnsayoI2C,
} from "../api/digital";

const key = "digital";

export function useInfoLaboratorio(idLabActual) {
  return useQuery([key, { idLaboratorio: idLabActual }], getInformationLab);
}

export function useEnsayosUsuario({ idLaboratorio, idUsuario }) {
  return useQuery(
    [key, { idLaboratorio: idLaboratorio, idUsuario: idUsuario }],
    getEnsayosUsuario
  );
}

export function usePostEnsayoUART() {
  return useMutation(postEnsayoUART);
}

export function usePostEnsayoI2C() {
  return useMutation(postEnsayoI2C);
}
