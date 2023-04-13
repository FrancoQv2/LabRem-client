import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../common/FormSelect";
import FormSaveUART from "./FormSaveUART";
import { usePostEnsayoUART } from "../../hooks/digital";
import { submitSuccess, submitError } from "../../libs/alerts";
import DownloadImage from "../DownloadImage" 

function FormUART({ idUsuario }) {
  // Definicion de valores posibles
  const valuesVelocidad = [
    300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600,]; // bps
  const defaultVelocidad = valuesVelocidad[5];
  const [cambio,setcambio] =useState(true);

  const valuesParidad = ["par","impar" ]; // bps
  const defaultParidad = valuesParidad[0];

  const valuescantidadBitParada = [0,1,2 ]; // bps
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
    setcambio(current =>!current);
    mutate({idUsuario,velocidad,cantidadBitDato,paridad,cantidadBitParada,mensaje,setcambio },
      {
        onSuccess: () => {
          setMensaje("");
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
        name="Velocidad"
        values={valuesVelocidad}
        defaultValue={defaultVelocidad}
        setState={setVelocidad}
      />
     <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formcantidadbitsdato"
          onChange={(changeEvent) => setcantidadBitsDato(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="cantidadbitsdato">
                 Cantidad de Bits del Dato
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-cantidadbitsdato" />
              <Form.Text id="text-cantidadbitsdato"></Form.Text>
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
                Caracteres a Trasmitir
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
      <Row>
        { cambio ? (<Col className="text-center">
        <Button variant="primary" type="submit">
          Iniciar experiencia
        </Button>
        </Col>):null

        }
        
        <Col className="text-center">
        <FormSaveUART
        idUsuario={idUsuario}
        velocidad={velocidad}
        cantidadBitDato={cantidadBitDato}
        paridad={paridad}
        cantidadBitParada={cantidadBitParada}
        mensaje={mensaje}
        />
        </Col>
        <Col className="text-center">
        <DownloadImage
        />
        </Col>
      </Row>
    </Form>
  );
}

export default FormUART;
