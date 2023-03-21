import axios from "axios";

// const API = process.env.API_CONTROL || "http://localhost:3030/api/teleco";
const API_CONTROL = "http://localhost:3031/api/control";

//-----------------------------------------------------
// Laboratorios - Fisica
//-----------------------------------------------------

/**
 * getInformationLab
 *
 */
export const getInformationLab = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;

  const { data } = await axios.get(`${API_CONTROL}/${idLaboratorio}`, {
    idLaboratorio: idLaboratorio,
  });
  return data;
};

/**
 * getEnsayosUsuario
 *
 */
export const getEnsayosUsuario = async ({ queryKey }) => {
  const [_, { idLaboratorio, idUsuario }] = queryKey;

  const url = `${API_CONTROL}/${idLaboratorio}/${idUsuario}`;

  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  return data;
};

/**
 *
 * @returns Todos los ensayos realizados dependiendo del id de lab
 */
export const getEnsayos = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;
  
  const url = `${API_CONTROL}/ensayos/${idLaboratorio}`;
 
  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio
  });

  return data;
};

/**
 * postEnsayoConvergentes
 *
 */
export const postEnsayoEstroboscopica = async ({
  idUsuario,
  FrecuenciaAgua,
  FrecuenciaLuz,
  caidaAgua
}) => {
  const newEnsayoEstroboscopica = {
    idUsuario: idUsuario,
    FrecuenciaCaidaAgua: parseInt(FrecuenciaAgua),
    FrecuenciaLuz: parseInt(FrecuenciaLuz),
    CaidaAgua: caidaAgua
  };
  
  const { data } = await axios.post(
    `${API_CONTROL}/estroboscopico`,
    newEnsayoEstroboscopica
  );
  return data;
};
