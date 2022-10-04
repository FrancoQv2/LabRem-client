import axios from "axios";

// const API = process.env.API_TELECO || "http://localhost:3030/api/teleco";
const API_TELECO = "http://localhost:3030/api/teleco";

//-----------------------------------------------------
// Laboratorio - Enlace Wifi
//-----------------------------------------------------

/**
 *
 * @returns Informacion del Laboratorio de Telecomunicaciones - Enlace Wifi
 */
export const getInformationWifi = async () => {
  const { data } = await axios.get(`${API_TELECO}/1`);
  return data;
};

/**
 *
 * @returns Todos los ensayos realizados en Enlace Wifi
 */
export const getEnsayosWifi = async () => {
  const { data } = await axios.get(`${API_TELECO}/wifi`);
  return data;
};

/**
 * @param {number} idUsuario
 * @returns Todos los ensayos realizados en Enlace Wifi para un usuario especifico
 */
export const getEnsayosUsuario = async ({ queryKey }) => {
  const [_, { idUsuario }] = queryKey;

  const { data } = await axios.get(`${API_TELECO}/wifi/${idUsuario}`, {
    idUsuario: idUsuario,
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
 * @returns Informacion del Laboratorio de Telecomunicaciones - Enlace Radio
 */
export const getLabRadio = async () => {
  const { data } = await axios.get(`${API_TELECO}/2`);
  return data;
};
