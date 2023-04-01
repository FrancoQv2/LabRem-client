import axios from "axios";
import { process, submitSuccess, submitErrorDato, saveSuccess } from "../libs/alerts";
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
export const getEnsayos = async ({ queryKey }) => {
  const [_, { idLaboratorio }] = queryKey;
  
  const url = `${API_DIGITAL}/ensayos/${idLaboratorio}`;
 
  const { data } = await axios.get(url, {
    idLaboratorio: idLaboratorio
  });

  return data;
};
/**
 * postEnsayoUART
 *
 */
export const postEnsayoUART = async ({
  idUsuario,
    velocidad,
    pulsador1,
    pulsador2,
    pulsador3,
    pulsador4,
    mensaje,
    setcambio,
}) => {

  const pulsadores = [];
  pulsadores.push(parseInt(pulsador1));
  pulsadores.push(parseInt(pulsador2));
  pulsadores.push(parseInt(pulsador3));
  pulsadores.push(parseInt(pulsador4));

  const newEnsayo = {
    idUsuario: idUsuario,
    velocidad: parseInt(velocidad),
    pulsadores: pulsadores,
    mensaje: mensaje,
  };
  process();
  const { data } = await axios.post(`${API_DIGITAL}/uart`, newEnsayo);
  setcambio(current=>!current);
  if (data === "laboratorio ok") {
    submitSuccess();
  } else {
    submitErrorDato(data);
  } 
  return data;
};


export const postEnsayoUARTSave = async ({
  idUsuario,
  velocidad,
  pulsador1,
  pulsador2,
  pulsador3,
  pulsador4,
  mensaje,
}) => {

const pulsadores = [];
pulsadores.push(parseInt(pulsador1));
pulsadores.push(parseInt(pulsador2));
pulsadores.push(parseInt(pulsador3));
pulsadores.push(parseInt(pulsador4));

const newEnsayo = {
  idUsuario: idUsuario,
  velocidad: parseInt(velocidad),
  pulsadores: pulsadores,
  mensaje: mensaje,
};
const { data } = await axios.post(`${API_DIGITAL}/uartsave`, newEnsayo);
if (data === "laboratorio ok") {
  saveSuccess();
} else {
  submitErrorDato(data);
} 
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
