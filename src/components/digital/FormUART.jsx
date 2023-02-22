import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../../components/FormSelect";

import { usePostEnsayoUART } from "../../hooks/digital";

function FormUART({ idUsuario }) {
  // Definicion de valores posibles
  const valuesVelocidad = [
    300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400,
    460800, 921600,
  ]; // bps
  const defaultVelocidad = valuesVelocidad[5];


  const valuesParidad = [
    "par","impar" 
  ]; // bps
  const defaultParidad = valuesParidad[0];


  const valuescantidadBitParada = [
    0,1,2 
  ]; // bps
  const defaultcantidadBitParada = valuescantidadBitParada[0];

  // Definicion de Hooks
  const [velocidad, setVelocidad] = useState(defaultVelocidad);

  const [cantidadBitDato, setcantidadBitsDato] = useState("");

  const [paridad, setParidad] = useState(defaultParidad);
  const [cantidadBitParada, setParada] = useState(defaultcantidadBitParada);

  const [mensaje, setMensaje] = useState("");

  const { mutate, error, isLoading } = usePostEnsayoUART();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        velocidad,
        cantidadBitDato,
        paridad,
        cantidadBitParada,
        mensaje
      },
      {
        onSuccess: () => {
          setMensaje("");
        },
      }
    );
  };
 
  
  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <FormSelect
        name="Velocidad"
        values={valuesVelocidad}
        defaultValue={defaultVelocidad}
        setState={setVelocidad}
      />
     
     <Row className="my-3">
     <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setcantidadBitsDato(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="cantidadBitDato">
                cantidad de Bits del Dato
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-cantidadBitDato" />
              <Form.Text id="text-cantidadBitDato"></Form.Text>
            </Col>
          </Row>
        </Form.Group>  
      </Row>

      <FormSelect
        name="Paridad"
        values={valuesParidad}
        defaultValue={defaultParidad}
        setState={setParidad}
      />

      <FormSelect
        name="Parada"
        values={valuescantidadBitParada}
        defaultValue={defaultcantidadBitParada}
        setState={setParada}
      />

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setMensaje(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="mensaje">
                Mensaje
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-mensaje" />
              <Form.Text id="text-mensaje"></Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row>
        <Button variant="primary" type="submit">
          Iniciar experiencia
        </Button>
      </Row>
    </Form>
  );
}

export default FormUART;
