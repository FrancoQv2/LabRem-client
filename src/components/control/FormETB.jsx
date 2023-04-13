import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormSelect from "../common/FormSelect";
import FormSaveETB from "./FormSaveETB"
import DownloadImage from "../DownloadImage"
import { usePostEnsayoEstroboscopica } from "../../hooks/control";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormETB({ idUsuario }) {
  // Definicion de valores posibles
  const valuesCaida = ["cae agua","no cae agua" ]; // bps
  const defaultCaida = valuesCaida[0];
  const [cambio,setcambio] =useState(true);
  // Definicion de Hooks

  const [FrecuenciaAgua, setFrecuenciaAgua] = useState("");
  const [FrecuenciaLuz, setFrecuenciaLuz] = useState("");

  const [caidaAgua, setCaida] = useState(defaultCaida);

  const { mutate, error, isLoading } = usePostEnsayoEstroboscopica();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current);
    mutate(
      {
        idUsuario,
        FrecuenciaAgua,
        FrecuenciaLuz,
        caidaAgua,
        setcambio
      },
      {
        onSuccess: () => {
        },
        onError: () => {
          submitError();
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
          onChange={(changeEvent) => setFrecuenciaAgua(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="FrecuenciaAgua">
                Frecuencia de caida del agua
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-FrecuenciaAgua" />
              <Form.Text id="text-FrecuenciaAgua"></Form.Text>
            </Col>
          </Row>
        </Form.Group>  
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formMensaje"
          onChange={(changeEvent) => setFrecuenciaLuz(changeEvent.target.value)}
        >
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="FrecuenciaLuz">
                Frecuencia de caida de la luz
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control type="text" aria-describedby="text-FrecuenciaLuz" />
              <Form.Text id="text-FrecuenciaLuz"></Form.Text>
            </Col>
          </Row>
        </Form.Group>  
      </Row>

      <FormSelect
        name="iniciar/detener caida de agua"
        values={valuesCaida}
        defaultValue={defaultCaida}
        setState={setCaida}
      />

      <Row>
                { cambio ? (
                <Col className="text-center">
                    <Button variant="primary" type="submit">
                        Iniciar experiencia
                    </Button>
                </Col>):null
                }
        
                <Col className="text-center">
                    <FormSaveETB
                        idUsuario={idUsuario}
                        FrecuenciaAgua={FrecuenciaAgua}
                        FrecuenciaLuz={FrecuenciaLuz}
                        caidaAgua={caidaAgua}
                    />
                </Col>

                <Col className="text-center">
                    <DownloadImage />
                </Col>
      </Row>
    </Form>
  );
}

export default FormETB;
