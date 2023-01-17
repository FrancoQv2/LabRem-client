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

  // Definicion de Hooks
  const [velocidad, setVelocidad] = useState(defaultVelocidad);

  const [pulsador1, setPulsador1] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador2, setPulsador2] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador3, setPulsador3] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador4, setPulsador4] = useState(0); // 0 -> apagado, 1 -> encendido

  const [mensaje, setMensaje] = useState("");

  const { mutate, error, isLoading } = usePostEnsayoUART();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        velocidad,
        pulsador1,
        pulsador2,
        pulsador3,
        pulsador4,
        mensaje,
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
          controlId="formPulsador"
          onChange={(changeEvent) => {
            switch (changeEvent.target.ariaLabel) {
              case "pulsador-1":
                setPulsador1(changeEvent.target.value);
                break;
              case "pulsador-2":
                setPulsador2(changeEvent.target.value);
                break;
              case "pulsador-3":
                setPulsador3(changeEvent.target.value);
                break;
              case "pulsador-4":
                setPulsador4(changeEvent.target.value);
                break;

              default:
                break;
            }
          }}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="pulsador-1">
                Pulsador 1
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="pulsador-1" defaultValue={pulsador1}>
                <option value={0}>Apagado</option>
                <option value={1}>Encendido</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="pulsador-2">
                Pulsador 2
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="pulsador-2" defaultValue={pulsador2}>
                <option value={0}>Apagado</option>
                <option value={1}>Encendido</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="pulsador-3">
                Pulsador 3
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="pulsador-3" defaultValue={pulsador3}>
                <option value={0}>Apagado</option>
                <option value={1}>Encendido</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="pulsador-4">
                Pulsador 4
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="pulsador-4" defaultValue={pulsador4}>
                <option value={0}>Apagado</option>
                <option value={1}>Encendido</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row>

      {/* <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formParidad"
          onChange={(changeEvent) => {
            setParidad(changeEvent.target.value);
            // console.log(changeEvent.target);
          }}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="paridad">
                Paridad
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="paridad" defaultValue={true}>
                <option value={true}>Par</option>
                <option value={false}>Impar</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row> */}

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
