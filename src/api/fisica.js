import axios from "axios";
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts";

// const API = process.env.API_FISICA || "http://localhost:3030/api/teleco";
const API_FISICA = "http://192.168.100.75:3032/api/fisica";

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
 * @returns Todos los ensayos realizados dependiendo del id de lab
 */
export const getEnsayos = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;
  
  const url = `${API_FISICA}/ensayos/${idLaboratorio}`;
 
  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio
  });

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
  diafragma,
  setcambio
}) => {
  const newEnsayoConvergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaPantalla: parseInt(distanciaPantalla),
    diafragma: diafragma,
  };
  process();
  const { data } = await axios.post(
    `${API_FISICA}/convergente`,
    newEnsayoConvergente
  );
  setcambio(current=>!current);
  if (data === "laboratorio ok") {
    submitSuccess();
  } else {
    submitErrorDato(data);
  } 
  return data;
};

/**
 * postEnsayoConvergentes
 *
 */
export const postEnsayoConvergentesSave = async ({
  idUsuario,
  distanciaLente,
  distanciaPantalla,
  diafragma
}) => {
  const newEnsayoConvergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaPantalla: parseInt(distanciaPantalla),
    diafragma: diafragma,
  };
  const { data } = await axios.post(
    `${API_FISICA}/convergentesave`,
    newEnsayoConvergente
  );
  if (data === "guardado en base de datos") {
    saveSuccess();
  } else {
    submitErrorDato(data);
  } 
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
  diafragma,
  setcambio,
}) => {
  const newEnsayoDivergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaLenteLente: parseInt(distanciaLenteLente),
    distanciaPantalla: parseInt(distanciaPantalla),
    diafragma: diafragma,
  };
  process();
  const { data } = await axios.post(`${API_FISICA}/divergente`,newEnsayoDivergente);
  
  setcambio(current=>!current);
  if (data === "laboratorio ok") {
    submitSuccess();
  } else {
    submitErrorDato(data);
  } 
  return data;
};
/**
 * postEnsayoDivergentes
 *
 */
export const postEnsayoDivergentesSave = async ({
  idUsuario,
  distanciaLente,
  distanciaLenteLente,
  distanciaPantalla,
  diafragma,
}) => {
  const newEnsayoDivergente = {
    idUsuario: idUsuario,
    distanciaLente: parseInt(distanciaLente),
    distanciaLenteLente: parseInt(distanciaLenteLente),
    distanciaPantalla: parseInt(distanciaPantalla),
    diafragma: diafragma,
  };
  const { data } = await axios.post(
    `${API_FISICA}/divergentesave`,
    newEnsayoDivergente
  );

  if (data === "guardado en base de datos") {
    saveSuccess();
  } else {
    submitErrorDato(data);
  } 
  return data;
};