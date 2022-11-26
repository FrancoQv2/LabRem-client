import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { usePostEnsayoDivergentes } from "../../hooks/fisica";

function FormDivergentes({ idUsuario }) {
  const [distanciaLente, setDistanciaLente] = useState(0);
  const [distanciaLenteLente, setDistanciaLenteLente] = useState(0);
  const [distanciaPantalla, setDistanciaPantalla] = useState(0);

  const { mutate, error, isLoading } = usePostEnsayoDivergentes();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      { idUsuario, distanciaLente, distanciaLenteLente, distanciaPantalla },
      {
        onSuccess: () => {
          setDistanciaLente(0);
          setDistanciaLenteLente(0);
          setDistanciaPantalla(0);
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
                min="50"
                max="920"
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
            <Col sm={4} lg={4}>
              <span className="input-group-text" htmlFor="range-distanciaLente">
                Distancia Lente [ mm ]
              </span>
            </Col>
            <Col sm={4} lg={8}>
              <Form.Control disabled type="text" value={distanciaLente} />
            </Col>
          </Row>
        </Form.Group>
      </Row>

      <Row className="my-3">
        <Form.Group
          className="border border-secondary rounded"
          controlId="formdistanciaLenteLenteRange"
        >
          <Row className="m-2">
            <Col>
              <Form.Range
                min="70"
                max="900"
                step="5"
                name="range-distanciaLenteLente"
                value={distanciaLenteLente}
                onChange={(changeEvent) =>
                  setDistanciaLenteLente(changeEvent.target.value)
                }
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm={4} lg={4}>
              <span
                className="input-group-text"
                htmlFor="range-distanciaLenteLente"
              >
                Distancia Lente Lente [ mm ]
              </span>
            </Col>
            <Col sm={4} lg={8}>
              <Form.Control disabled type="text" value={distanciaLenteLente} />
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
            <Col sm={4} lg={4}>
              <span
                className="input-group-text"
                htmlFor="range-distanciaPantalla"
              >
                Distancia Pantalla [ mm ]
              </span>
            </Col>
            <Col sm={4} lg={8}>
              <Form.Control disabled type="text" value={distanciaPantalla} />
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

export default FormDivergentes;
