import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Laboratorios() {
  // TRUNCATE TABLE LabRem_Teleco.Ensayos;
  // TRUNCATE TABLE LabRem_Teleco.Laboratorios;
  // TRUNCATE TABLE LabRem_Fisica.Ensayos;
  // TRUNCATE TABLE LabRem_Fisica.Laboratorios;
  // TRUNCATE TABLE LabRem_Digitales.Ensayos;
  // TRUNCATE TABLE LabRem_Digitales.Laboratorios;

  // const urlAPI = "http://127.0.0.1:3033/api/teleco/";
  // const urlAPI = "http://localhost:3032/api/fisica/";
  const urlAPI = "http://localhost:3034/api/digital/";

  // const idLaboratorio = 1;
  const idLaboratorio = 2;

  // const area = "Telecomunicaciones";
  // const area = "Física Experimental Básica";
  const area = "Sistemas Digitales";

  // const nombre = "Enlace de WiFi punto a punto";
  // const nombre = "Enlace punto a punto con radio definida por software";
  // const nombre = "Lentes Convergentes";
  // const nombre = "Lentes Divergentes";
  // const nombre = "Transmisor/Receptor UART";
  const nombre = "Transmisor/Receptor I2C";

  // const descripcion =
  //   "La experiencia tiene como objetivo Implementar un enlace de datos WiFi 2.4GHz punto a punto. Se espera que el estudiante adquiera competencias en apuntamiento de antenas e interpretación de indicadores de calidad de señal. Para la experiencia se disponen de dos antenas parabólicas separadas una distancia de 10m. Cada una de ellas conectadas directamente a un atenuador seguido de un punto de acceso. Una antena es fija mientras que la otra se encuentra articulada de tal manera de poder graduar su ángulo de elevación y azimut. Inicialmente el estudiante fijará una inclinación y moverá la otra hasta lograr un enlace óptimo. La calidad de este enlace se mide a través de una interfaz web propia de los puntos de acceso que permiten medir la intensidad de la señal recibida. El experimento finaliza cuando se logra un valor óptimo de potencia. Se espera medir la intensidad de cantidad de señal recibida medida en decibelios (RSCI), el ángulo de elevación (grados) y el ángulo de azimut (grados). Estos valores se visualizarán mediante una tabla de valores Para desarrollar esta experiencia actualmente se dispone de dos antenas con reflector parabólico frecuencia 2,4GHz ganancia 24dBi, 2 atenuadores y dos puntos de acceso Ubiquity Bullet M2.";

  // const descripcion =
  //   "La experiencia tiene como objetivo experimentar el efecto de distintos esquemas de modulación y codificación sobre el desempeño de un sistema de comunicación digital. Se espera que el estudiante adquiera competencias en analizar sistemas de comunicaciones digitales en capas físicas y de enlace. Se emplea una computadora conectada a dos periféricos separados una distancia de 6m. Los periféricos son capaces de conectarse entre sí por radiofrecuencia. Cada uno se conecta a un conector usb que ingresa directamente a dos puertos usb de una PC. Ante una dada modulación y codificación y un rango de nivel de intensidad determinado, el estudiante a través de un entorno Gnuradio será capaz de evaluar la intensidad de la señal del enlace logrado en ese rango de niveles y estimar la configuración óptima. El estudiante también deberá ensayar el enlace transmitiendo tramas conocidas y comparando las tramas recibidas estimando la tasa de errores de bit (BER) y la tasa de errores de trama (FER). Los datos y/o parámetros de entrada necesarios para la experiencia son: 1. Rango de nivel de potencia de transmisor: Mínimo y máximo; 2. Esquema de modulación 3. Tipo de codificación Se esperan poder medir: 1. Intensidad de señal recibida (Dbm) para cada valor de potencia especificado en el rango de entrada 2. Tasa de errores de bit (cantidad de bits con error / bits transmitidos) (BER). Para visualización se grafica el nivel de intensidad de la señal en función de la tasa de error. Para desarrollar esta experiencia actualmente se dispone de computadoras y periféricos de radio definida por software Hack-RF (transmisor/receptor half-duplex banda corrida 10 MHz a 6 GHz, ancho de banda 20 MHz, 8 bits) Como herramienta de software se emplea el lenguaje Python y el marco de aplicación o framework Gnuradio (software libre bajo licencia GPL).";

  // const descripcion =
  //   'La experiencia tiene como objetivos: estudiar experimentalmente la formación de imágenes por lentes convergentes, validar los supuestos del modelo teórico para lentes convergentes delgadas y determinar el valor acotado de la distancia focal de una lente convergente. Se espera que el alumno adquiera capacidades para explicar el funcionamiento de las lentes convergentes en la formación de imágenes, explicitar la diferencia entre una imagen "real" y una imagen "virtual", contrastar el modelo de lentes delgadas (ecuación de la lente delgada) con los resultados experimentales y elaborar conclusiones acerca del trabajo experimental.. La experiencia utiliza un sistema óptico sencillo (fuente luminosa - lente convergente - pantalla) en el cual los estudiantes podrán observar a través de una cámara la imagen que forma la lente en la pantalla. Para una posición fija de la lente, se varía la distancia objeto desplazando la fuente luminosa sobre un riel. Una vez seleccionada la distancia objeto se desplaza la pantalla sobre el riel para buscar el plano donde se forma una imagen nítida. En este momento se mide la distancia entre la lente y la pantalla, es decir, la distancia imagen. Repitiendo el procedimiento para varias distancias objeto, se obtendrá un conjunto de valores de distancias objeto e imagen que el estudiante podrá procesar en forma gráfica y comprobar experimentalmente si la lente se comporta como lente delgada. El sistema permite incorporar un diafragma central para corregir posibles aberraciones de esfericidad. Para desarrollar esta experiencia de manera presencial, actualmente se dispone de seis equipos completos (rieles con escala graduada en mm, conjuntos de lentes convergentes, filtros y colimadores).';

  // const descripcion =
  //   'La experiencia tiene como objetivos: estudiar experimentalmente la formación de imágenes por lentes divergentes y medir la distancia focal de la lente divergente. Se espera que el alumno genere capacidades para explicar el funcionamiento de las lentes divergentes en la formación de imágenes, utilizar diagramas de marcha de rayos y explicitar los conceptos de "imagen real", "imagen virtual", "objeto real" y "objeto virtual". Se utiliza el mismo sistema experimental de la experiencia de lentes convergentes, al cual se incorpora además una lente divergente. Se utiliza como "objeto virtual" la imagen real que forma la lente convergente en un plano determinado y se coloca lente divergente de manera conveniente para que ésta forme una "imagen real" de ese objeto virtual en otro plano que se localiza desplazando la pantalla. Como dato de entrada se necesita distancia focal de la lente convergente para planificar la medición y elegir adecuadamente la posición de la lente divergente. La cámara (que enfoca la pantalla) se emplea para detectar una imagen nítida en la pantalla y un sistema de rieles permite medir las diferentes distancias. Se medirán la distancia entre la lente convergente y divergente (que permitirá calcular la distancia objeto) y la distancia lente divergente-pantalla, con los cuales el estudiante podrá calcular la distancia focal de la lente divergente, suponiendo modelo de lentes delgadas. En esta experiencia no se realiza control de ajuste de modelo. Se puede realizar con o sin diafragma central. Para desarrollar esta experiencia en forma presencial actualmente se dispone de seis equipos (rieles con escala graduada en mm, conjuntos de lentes convergentes y divergentes, filtros y colimadores)';

  // const descripcion =
  //   "Tiene como objetivo validar el diseño e implementación de un Transmisor/Receptor UART en un dispositivo FPGA. Se espera que el estudiante genere competencias en evaluar, diagnosticar y corregir el diseño lógico de una interfaz UART en FPGA para el normal funcionamiento La comunicación se evalúa entre dos terminales: 1)-dispositivo FPGA que contiene la interfaz uart y 2)-una PC que contiene una interfaz gráfica que monitorea la comunicación. El dispositivo FPGA se conecta a la PC mediante un adaptador usb/uart el cual permite emular una comunicación en la PC mediante su puerto usb. La PC ejecuta una aplicación de código libre que permite transferir datos hacia y desde el dispositivo FPGA respectivamente. Como parámetro de entrada en la prueba de transmisión y recepción, el estudiante debe especificar velocidad, cantidad de bits del dato, tipo de paridad, cantidad de bits de parada, cadena de caracteres a transmitir desde FPGA a PC y dato a transmitir desde PC a FPGA. Finalmente los configura en el dispositivo en ambos terminales. En la prueba de transmisión el estudiante debe: 1)-Definir el mensaje que desea transmitir desde el dispositivo FPGA como una cadena de caracteres ascii. 2)-Enviar los datos desde la interfaz hacia la PC vía adaptador usb/uart 3)-Chequear en la aplicación que monitorea el puerto serie que se recibe adecuadamente la cadena de caracteres. En la prueba de recepción el estudiante debe: 1)-Define el dato que desea enviar desde el monitor del puerto serie en la pc hacia la interfaz implementada en el dispositivo FPGA. 2)-Enviar el dato desde la PC.3)-El dispositivo FPGA recibe el dato y lo visualiza en 8 leds disponibles en el sistema de desarrollo que aloja el dispositivo FPGA. Finalmente el estudiante debe identificar el error en el diseño lógico en caso de no ser correcta la cadena recibida o enviada por el dispositivo FPGA, lo corrige, reprograma y vuelve a repetir el procedimiento. Como resultado se desea visualizar tensiones (o estados lógicos) de bits de transmisión y recepción en función del tiempo. Para desarrollar esta experiencia actualmente se dispone de dos placas educacionales FPGA Cyclone II y tres placas educacionales FPGA Cyclone IV. Además se cuenta con conversores USB/UART.";

  const descripcion =
    "La experiencia tiene como objetivo validar el diseño e implementación de una comunicación serie sincrónica maestro-esclavo I2C en un dispositivo FPGA. Se espera que el estudiante adquiera competencias en evaluar, diagnosticar y corregir el diseño de una interfaz I2C en FPGA para el normal funcionamiento. La comunicación I2C se evalúa entre dos terminales: 1) dispositivo FPGA que hace las veces de maestro y 2) una memoria EEPROM que hace las veces de esclavo. El dispositivo FPGA se conecta a la memoria mediante una interfaz I2C. Desde el dispositivo FPGA se solicita leer o escribir la memoria EEPROM. La lectura de un byte en la memoria se implementa visualizando en 8 leds la palabra binaria. La escritura se realiza enviando a la memoria la dirección de escritura y el dato a escribir. Los datos y/o parámetros de entrada necesarios para la experiencia son frecuencia de la comunicación, dirección de la memoria para leer o escribir, dato a escribir en la memoria en caso de una escritura, señal que habilita la lectura o la escritura. Se espera medir las Tensiones (o estados lógicos) de bits de transmisión y recepción en función del tiempo. Para visualización de resultados en el caso de leer la memoria se implementa mediante un conjunto de 8 leds, en caso de escritura se implementa escribiendo un dato en la memoria y luego, mediante un proceso de lectura chequeando ese dato en 8 leds en la placa de prueba. Para esta experiencia se cuenta con el mismo equipamiento descrito en la experiencia del apartado a) de este LR.";

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  const postLaboratorio = async () => {
    const newLaboratorio = {
      idLaboratorio: idLaboratorio,
      area: area,
      nombre: nombre,
      descripcion: descripcion,
    };

    console.log(newLaboratorio);

    const { data } = await axios.post(urlAPI, newLaboratorio);

    return data;
  };

  function usePostLaboratorio() {
    return useMutation(postLaboratorio);
  }

  const { mutate, error, isLoading } = usePostLaboratorio();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate({
      idLaboratorio,
      area,
      nombre,
      descripcion,
    });
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <Row>
        <Button variant="primary" size="sm" type="submit">
          Cargar Info Laboratorios Telecomunicaciones
        </Button>
        {/* <Button variant="primary" size="sm" type="submit">
          Cargar Info Laboratorios Fisica
        </Button>
        <Button variant="primary" size="sm" type="submit">
          Cargar Info Laboratorios Sistemas
        </Button> */}
      </Row>
    </Form>
  );
}

export default Laboratorios;
