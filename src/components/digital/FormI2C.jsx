import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../FormSelect";

import { usePostEnsayoI2C } from "../../hooks/digital";

function FormI2C({ idUsuario }) {
  const valuesLectura = ["lectura","escritura"]; // bps
  const defaultLectura = valuesLectura[0];

  // Definicion de Hooks

  const [accion, setLectura] = useState(defaultLectura);

  const [frecuencia, setFrecuencia] = useState("");
  const [memoria, setMemoria] = useState("");
  const [datos, setDatos] = useState("");
  const { mutate, error, isLoading } = usePostEnsayoI2C();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        frecuencia,
        memoria,
        accion,
        datos
      },
      {
        onSuccess: () => {
          setFrecuencia("");
          setMemoria(0);
        },
      }
    );
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit}>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setFrecuencia(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="mensaje">
                Frecuencia
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-mensaje" />
              <Form.Text id="text-mensaje"></Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setMemoria(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="mensaje">
                Memoria
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-mensaje" />
              <Form.Text id="text-mensaje"></Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <FormSelect
        name="accion"
        values={valuesLectura}
        defaultValue={defaultLectura}
        setState={setLectura}
      />

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setDatos(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="mensaje">
                Datos
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

export default FormI2C;
