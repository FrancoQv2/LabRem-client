import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../FormSelect";

import { usePostEnsayoI2C } from "../../hooks/digital";

function FormI2C({ idUsuario }) {
  // Definicion de valores posibles
  const valuesVelocidad = [100000, 400000, 1000000, 3400000, 5000000]; // bbps

  // Definicion de valores default
  const defaultVelocidad = valuesVelocidad[0];

  // Definicion de Hooks
  const [velocidad, setVelocidad] = useState(defaultVelocidad);
  const [memoria, setMemoria] = useState(0);
  const [readWrite, setReadWrite] = useState(0); // 0 -> read, 1 -> write
  const [mensaje, setMensaje] = useState(0);

  const { mutate, error, isLoading } = usePostEnsayoI2C();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        velocidad,
        memoria,
        readWrite,
        mensaje,
      },
      {
        onSuccess: () => {
          setVelocidad(defaultVelocidad);
          setMemoria(0);
          setReadWrite(0);
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
          controlId="formMemoria"
          onChange={(changeEvent) => setMemoria(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="memoria">
                Memoria
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="number" aria-describedby="text-memoria" />
              <Form.Text id="text-memoria"></Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formReadWrite"
          onChange={(changeEvent) => {
            setReadWrite(changeEvent.target.value);
            // console.log(changeEvent.target);
          }}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="readWrite">
                Bit read/write
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="readWrite" defaultValue={0}>
                <option value={0}>Lectura</option>
                <option value={1}>Escritura</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row>

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

export default FormI2C;
