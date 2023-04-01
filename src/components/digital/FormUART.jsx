import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelect from "../../components/FormSelect";
import FormSaveUART from "./FormSaveUART";
import { usePostEnsayoUART } from "../../hooks/digital";
import { submitSuccess, submitError } from "../../libs/alerts"; 

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

  const [cantidadBitParada, setParada] = useState(defaultcantidadBitParada);
  const [pulsador1, setPulsador1] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador2, setPulsador2] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador3, setPulsador3] = useState(0); // 0 -> apagado, 1 -> encendido
  const [pulsador4, setPulsador4] = useState(0); // 0 -> apagado, 1 -> encendido
  const [mensaje, setMensaje] = useState("");

  const { mutate, error, isLoading } = usePostEnsayoUART();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current);
    mutate({idUsuario,velocidad,pulsador1,pulsador2,pulsador3,pulsador4,mensaje,setcambio },
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
        pulsador1={pulsador1}
        pulsador2={pulsador2}
        pulsador3={pulsador3}
        pulsador4={pulsador4}
        mensaje={mensaje}
        />
        </Col>
      </Row>
    </Form>
  );
}

export default FormUART;
