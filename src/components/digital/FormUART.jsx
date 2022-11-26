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
  ];
  const valuesBitsParada = [0, 1, 2];
  const valuesBitsDatos = [5, 6, 7, 8, 9];

  // Definicion de valores default
  const defaultVelocidad = valuesVelocidad[5];
  const defaultBitsParada = valuesBitsParada[1];
  const defaultBitsDatos = valuesBitsDatos[2];

  // Definicion de Hooks
  const [velocidad, setVelocidad] = useState(defaultVelocidad);
  const [bitsDatos, setBitsDatos] = useState(defaultBitsDatos);
  const [bitsParada, setBitsParada] = useState(defaultBitsParada);
  const [paridad, setParidad] = useState(true); // false -> par, true -> impar
  const [mensaje, setMensaje] = useState("");

  const { mutate, error, isLoading } = usePostEnsayoUART();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      {
        idUsuario,
        velocidad,
        bitsDatos,
        bitsParada,
        paridad,
        mensaje,
      },
      {
        onSuccess: () => {
          setVelocidad(defaultVelocidad);
          setBitsDatos(defaultBitsDatos);
          setBitsParada(defaultBitsParada);
          setParidad(true);
          setMensaje("");
        },
      }
    );
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      {/* <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formVelocidad"
          onChange={(changeEvent) => setVelocidad(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="velocidad">
                Velocidad
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Select aria-label="velocidad">
                <option value={0}>-</option>
                <option value={300}>300</option>
                <option value={600}>600</option>
                <option value={1200}>1200</option>
                <option value={2400}>2400</option>
                <option value={4800}>4800</option>
                <option value={9600}>9600</option>
                <option value={19200}>19200</option>
                <option value={38400}>38400</option>
                <option value={57600}>57600</option>
                <option value={115200}>115200</option>
                <option value={230400}>230400</option>
                <option value={460800}>460800</option>
                <option value={921600}>921600</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Row> */}

      <FormSelect
        name="Velocidad"
        values={valuesVelocidad}
        defaultValue={defaultVelocidad}
        setState={setVelocidad}
      />

      <FormSelect
        name="Bits de Datos"
        values={valuesBitsDatos}
        defaultValue={defaultBitsDatos}
        setState={setBitsDatos}
      />

      <FormSelect
        name="Bits de Parada"
        values={valuesBitsParada}
        defaultValue={defaultBitsParada}
        setState={setBitsParada}
      />

      <Row className="my-3">
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

export default FormUART;
