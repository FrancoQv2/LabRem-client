import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../FormSelect";

import { usePostEnsayoPosicion } from "../../hooks/control";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormPOS({ idUsuario }) {
  // Definicion de valores posibles
  const valuesExitacion = ["Senoidal","Cuadrada","Triangular" ]; // bps
  const defaultExitacion = valuesExitacion[0];
  const valuesCaida = ["cae agua","no cae agua" ]; // bps
  const defaultCaida = valuesCaida[0];
  // Definicion de Hooks

  const [exitacion, setExitacion] = useState(defaultExitacion);
  const [caidaAgua, setCaida] = useState(defaultCaida);

  const { mutate, error, isLoading } = usePostEnsayoPosicion();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        exitacion,
        caidaAgua
      },
      {
        onSuccess: () => {
          submitSuccess();
        },
        onError: () => {
          submitError();
        },
      }
    );
  };
 
  
  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      
     

      
      <FormSelect
        name="Tipo de exitacion"
        values={valuesExitacion}
        defaultValue={defaultExitacion}
        setState={setExitacion}
      />
      

      <FormSelect
        name="iniciar/detener caida de agua"
        values={valuesCaida}
        defaultValue={defaultCaida}
        setState={setCaida}
      />

      <Row>
        <Button variant="primary" type="submit">
          Iniciar experiencia
        </Button>
      </Row>
    </Form>
  );
}

export default FormPOS;
