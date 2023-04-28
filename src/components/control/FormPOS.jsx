import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormSelect from "../common/FormSelect";
import DownloadImage from "../DownloadImage"
import { usePostEnsayoPosicion } from "../../hooks/control";
import { submitSuccess, submitError } from "../../libs/alerts"; 
import FormSavePosicion from "./FormSavePosicion";
function FormPOS({ idUsuario }) {
  // Definicion de valores posibles
  const valueModificacion = ["retardos","no linealidades","polos-ceros extras" ]; // bps
  const defaultModificacion = valueModificacion[0];
  // Definicion de Hooks

  const [Modificacion, setModificacion] = useState(defaultModificacion);
  const [Rapidez, setRapidez] = useState("");
  const [RapidezControl, setRapidezControl] = useState("");
  const [cambio,setcambio] =useState(true);
  const [anguloSalida, setAnguloSalida] = useState(0);
  const [anguloSalidaControl, setAnguloSalidaControl] = useState(0);
  const { mutate, error, isLoading } = usePostEnsayoPosicion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current);
    mutate(
      {
        idUsuario,
        Rapidez,
        anguloSalida,
        Modificacion,
        RapidezControl,
        anguloSalidaControl,
        setcambio
        
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
      
      <Card.Subtitle>Motor y Tren reductor</Card.Subtitle>
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formdistanciaLenteRange"
        >
          <Row className="m-2">
            <Col>
              <Form.Range
                min="-180"
                max="180"
                step="1"
                name="range-anguloSalida"
                value={anguloSalida}
                onChange={(changeEvent) =>
                  setAnguloSalida(changeEvent.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="range-anguloSalida">
                Angulo Salida [ ° ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control disabled type="text" value={anguloSalida} />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setRapidez(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="Rapidez">
                Rapidez de cambio
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-Rapidez" />
              <Form.Text id="text-Rapidez"></Form.Text>
            </Col>
          </Row>
        </Form.Group>  
      </Row>
      <Card.Subtitle>driver del motor</Card.Subtitle>
      <FormSelect
        name="Modificaciones"
        values={valueModificacion}
        defaultValue={defaultModificacion}
        setState={setModificacion}
      />
      <Card.Subtitle>Controlador</Card.Subtitle>
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formanguloRange"
        >
          <Row className="m-2">
            <Col>
              <Form.Range
                min="-180"
                max="180"
                step="1"
                name="range-anguloSalidaControl"
                value={anguloSalidaControl}
                onChange={(changeEvent) =>
                  setAnguloSalidaControl(changeEvent.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="range-anguloSalidaControl">
                Angulo Salida [ ° ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control disabled type="text" value={anguloSalidaControl} />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setRapidezControl(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="RapidezControl">
                Rapidez de cambio
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-RapidezControl" />
              <Form.Text id="text-RapidezControl"></Form.Text>
            </Col>
          </Row>
        </Form.Group>  
      </Row>
      <Row>
        { cambio ? (
          <Col className="text-center">
            <Button variant="primary" type="submit">
              Iniciar experiencia
            </Button>
          </Col>):null
        }
        
        <Col className="text-center">
          <FormSavePosicion
            idUsuario={idUsuario}
            Rapidez={Rapidez}
            anguloSalida={anguloSalida}
            Modificacion={Modificacion}
            RapidezControl={RapidezControl}
            anguloSalidaControl={anguloSalidaControl}
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

export default FormPOS;
