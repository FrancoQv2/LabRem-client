import axios from "axios";

const API_DIGITAL = "http://localhost:3034/api/digital";

//-----------------------------------------------------
// Laboratorios - Sistemas Digitales
//-----------------------------------------------------

/**
 * getInformationLab
 *
 */
export const getInformationLab = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;

  const { data } = await axios.get(`${API_DIGITAL}/${idLaboratorio}`, {
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

  const url = `${API_DIGITAL}/${idLaboratorio}/${idUsuario}`;

  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  return data;
};

//-----------------------------------------------------
// Laboratorio - UART
//-----------------------------------------------------

/**
 * getEnsayosUART
 *
 */
export const getEnsayosUART = async () => {
  const { data } = await axios.get(`${API_DIGITAL}/uart`);
  console.log(data);
  return data;
};

/**
 * postEnsayoUART
 *
 */
export const postEnsayoUART = async ({
  idUsuario,
    velocidad,
    cantidadBitDato,
    paridad,// false par, true impar
    cantidadBitParada,
    mensaje,
}) => {

  const newEnsayo = {
    idUsuario: idUsuario,
    velocidad: parseInt(velocidad),
    cantidadBitDato: cantidadBitDato,
    paridad: paridad,
    cantidadBitParada: cantidadBitParada,
    mensaje: mensaje,
  };

  const { data } = await axios.post(`${API_DIGITAL}/uart`, newEnsayo);
  return data;
};

//-----------------------------------------------------
// Laboratorio - I2C
//-----------------------------------------------------

/**
 * getEnsayosI2C
 *
 */
export const getEnsayosI2C = async () => {
  const { data } = await axios.get(`${API_DIGITAL}/i2c`);
  return data;
};

/**
 * usePostEnsayoI2C
 *
 */
export const postEnsayoI2C = async ({
  idUsuario,
  frecuencia,
  memoria,
  accion,
  datos
}) => {
  const newEnsayo = {
    idUsuario: idUsuario,
    accion: accion,
    frecuencia: frecuencia,
    memoria: memoria,
    datos: datos,
  };

  const { data } = await axios.post(`${API_DIGITAL}/i2c`, newEnsayo);
  console.log(data);
  return data;
};
