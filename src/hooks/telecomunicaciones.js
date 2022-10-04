import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  getInformationWifi,
  getEnsayosUsuario,
  postEnsayoWifi,
} from "../api/telecomunicaciones";

const key = "telecomunicaciones";

export function usePostEnsayoWifi() {
  //   const queryClient = useQueryClient();

  //   return useMutation(postEnsayoWifi, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries([key]);
  //     },
  //   });

  return useMutation(postEnsayoWifi);
}

export function useInformationWifi() {
  return useQuery([key], getInformationWifi);
}

export function useEnsayosUsuario(idUsuarioActual) {
  return useQuery([key, { idUsuario: idUsuarioActual }], getEnsayosUsuario);
}
