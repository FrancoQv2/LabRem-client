import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormSelect from "../../components/FormSelect";
import { usePostEnsayoConvergentes } from "../../hooks/fisica";
import { submitSuccess, submitError } from "../../libs/alerts"; 
import FormSaveConvergente from "./FormSaveConvergente";
import DownloadImage from "../DownloadImage"

function FormConvergentes({ idUsuario }) {
  const tipoDiafragma = ["sin diafragma","diafragma central","diafragma periferico","filtro rojo" ]; 
  const defaultDiafragma = tipoDiafragma[0];
  
  const [distanciaLente, setDistanciaLente] = useState(120);
  const [distanciaPantalla, setDistanciaPantalla] = useState(70);
  const [diafragma, setDiafragma] = useState(defaultDiafragma);
  const { mutate, error, isLoading } = usePostEnsayoConvergentes();
  const [cambio,setcambio] =useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current);
    mutate(
      { idUsuario, distanciaLente, distanciaPantalla, diafragma,setcambio },
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
          controlId="formdistanciaLenteRange"
        >
          <Row className="m-2">
            <Col>
              <Form.Range
                min="120"
                max="970"
                step="5"
                name="range-distanciaLente"
                value={distanciaLente}
                onChange={(changeEvent) =>
                  setDistanciaLente(changeEvent.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span className="input-group-text" htmlFor="range-distanciaLente">
                Distancia Foco - Lente [ mm ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control disabled type="text" value={distanciaLente} />
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formdistanciaPantallaRange"
        >
          <Row className="m-2">
            <Col>
              <Form.Range
                min="70"
                max="970"
                step="5"
                name="range-distanciaPantalla"
                value={distanciaPantalla}
                onChange={(changeEvent) =>
                  setDistanciaPantalla(changeEvent.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm={4} lg={6}>
              <span
                className="input-group-text"
                htmlFor="range-distanciaPantalla"
              >
                Distancia Lente - Pantalla [ mm ]
              </span>
            </Col>
            <Col sm={4} lg={6}>
              <Form.Control disabled type="text" value={distanciaPantalla} />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <FormSelect
            name="Diafragma"
            values={tipoDiafragma}
            defaultValue={defaultDiafragma}
            setState={setDiafragma}
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
          <FormSaveConvergente
            idUsuario={idUsuario}
            distanciaLente={distanciaLente}
            distanciaPantalla={distanciaPantalla}
            diafragma={diafragma}
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

export default FormConvergentes;
