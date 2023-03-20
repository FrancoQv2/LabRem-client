import axios from "axios";

// const API = process.env.API_TELECO || "http://localhost:3030/api/teleco";
const API_TELECO = "http://localhost:3033/api/teleco";

//-----------------------------------------------------
// Laboratorios - Teleco
//-----------------------------------------------------

/**
 *
 * @returns Informacion de un Laboratorio de Telecomunicaciones segun su ID
 */
export const getInfoLaboratorio = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;

  const { data } = await axios.get(`${API_TELECO}/${idLaboratorio}`, {
    idLaboratorio: idLaboratorio,
  });
  return data;
};

/**
 * @param {number} idUsuario
 * @returns Todos los ensayos realizados en Enlace Wifi para un usuario especifico
 */
export const getEnsayosUsuario = async ({ queryKey }) => {
  const [_, { idLaboratorio, idUsuario }] = queryKey;

  const url = `${API_TELECO}/${idLaboratorio}/${idUsuario}`;

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
  
  const url = `${API_TELECO}/ensayos/${idLaboratorio}`;
 
  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio
  });

  return data;
};
/**
 *
 * @param {Object} newEnsayo
 * @param {number} newEnsayo.idUsuario
 * @param {number} newEnsayo.elevacion
 * @param {number} newEnsayo.azimut
 */
export const postEnsayoWifi = async ({ idUsuario, elevacion, azimut }) => {
  const newEnsayoWifi = {
    idUsuario: idUsuario,
    elevacion: parseInt(elevacion),
    azimut: parseInt(azimut),
  };

  const { data } = await axios.post(`${API_TELECO}/wifi`, newEnsayoWifi);
  return data;
};

//-----------------------------------------------------
// Laboratorio - Enlace Radio
//-----------------------------------------------------

/**
 *
 * @returns Todos los ensayos realizados en Enlace Radio
 */
export const getEnsayosRadio = async () => {
  const { data } = await axios.get(`${API_TELECO}/radio`);
  return data;
};

/**
 *
 * @param {Object} newEnsayo
 * @param {number} newEnsayo.idUsuario
 * @param {string} newEnsayo.modulacion
 * @param {number} newEnsayo.codificacion
 * @param {number} newEnsayo.intensidadMin
 * @param {number} newEnsayo.intensidadMax
 */
export const postEnsayoRadio = async ({
  idUsuario,
  modulacion,
  codificacion,
  intensidadMin,
  intensidadMax,
}) => {
  const newEnsayoRadio = {
    idUsuario: idUsuario,
    tipoModulacion: parseInt(modulacion),
    tipoCodificacion: parseInt(codificacion),
    intensidadMin: parseInt(intensidadMin),
    intensidadMax: parseInt(intensidadMax),
  };

  console.log(newEnsayoRadio);

  const { data } = await axios.post(`${API_TELECO}/radio`, newEnsayoRadio);
  console.log(data);
  return data;
};
