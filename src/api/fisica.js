import axios from "axios";

// const API = process.env.API_FISICA || "http://localhost:3030/api/teleco";
const API_FISICA = "http://localhost:3032/api/fisica";

//-----------------------------------------------------
// Laboratorios - Fisica
//-----------------------------------------------------

/**
 * getInformationLab
 *
 */
export const getInformationLab = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;

  const { data } = await axios.get(`${API_FISICA}/${idLaboratorio}`, {
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

  const url = `${API_FISICA}/${idLaboratorio}/${idUsuario}`;

  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  return data;
};

//-----------------------------------------------------
// Laboratorio - Lentes Convergentes
//-----------------------------------------------------

/**
 *
 * @returns Todos los ensayos realizados en Lentes Convergentes
 */
export const getEnsayosConvergentes = async () => {
  const { data } = await axios.get(`${API_FISICA}/convergente`);
  return data;
};

/**
 * postEnsayoConvergentes
 *
 */
export const postEnsayoConvergentes = async ({
  idUsuario,
  distanciaLente,
  distanciaPantalla,
}) => {
  const newEnsayoConvergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaPantalla: parseInt(distanciaPantalla),
  };

  const { data } = await axios.post(
    `${API_FISICA}/convergente`,
    newEnsayoConvergente
  );
  return data;
};

//-----------------------------------------------------
// Laboratorio - Lentes Divergentes
//-----------------------------------------------------

/**
 * getEnsayosRadio
 *
 */
export const getEnsayosDivergente = async () => {
  const { data } = await axios.get(`${API_FISICA}/divergente`);
  return data;
};

/**
 * postEnsayoDivergentes
 *
 */
export const postEnsayoDivergentes = async ({
  idUsuario,
  distanciaLente,
  distanciaLenteLente,
  distanciaPantalla,
}) => {
  const newEnsayoDivergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaLenteLente: parseInt(distanciaLenteLente),
    distanciaPantalla: parseInt(distanciaPantalla),
  };

  const { data } = await axios.post(
    `${API_FISICA}/divergente`,
    newEnsayoDivergente
  );
  console.log(data);
  return data;
};
