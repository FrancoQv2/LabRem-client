import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getInformationLab,
  getEnsayosUsuario,
  postEnsayoConvergentes,
  postEnsayoDivergentes,
} from "../api/fisica";

const key = "fisica";

export function useInformationLab(idLabActual) {
  return useQuery([key, { idLaboratorio: idLabActual }], getInformationLab);
}

export function useEnsayosUsuario({ idLaboratorio, idUsuario }) {
  return useQuery(
    [key, { idLaboratorio: idLaboratorio, idUsuario: idUsuario }],
    getEnsayosUsuario
  );
}

export function usePostEnsayoConvergentes() {
  return useMutation(postEnsayoConvergentes);
}

export function usePostEnsayoDivergentes() {
  return useMutation(postEnsayoDivergentes);
}
