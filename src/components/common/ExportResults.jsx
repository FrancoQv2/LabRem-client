import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { CSVLink } from "react-csv";

import { getDateNow } from "../../libs/datetime.js"

function ExportResults({ useHook, idLaboratorio, idUsuario, filename }) {
  const options = {
    staleTime: Infinity,
    cacheTime: Infinity
  }

  const { data, error, isLoading } = useHook({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario
  }, options);
 
  return (
    <>
      <Row>
        <Col>
          <Button variant="secondary" disabled>
            Exportar resultados
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          {!isLoading ? (
            <Button variant="success" className="mx-2">
              <CSVLink 
                className="text-light"
                data={data} 
                target="_blank"
                filename={`${filename}-${getDateNow()}.csv`}
                >
                csv
              </CSVLink>
            </Button>
          ) : (
            <Button variant="success" className="mx-2">
              csv
            </Button>
          )}
          <Button variant="success" className="mx-2">
            pdf
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ExportResults
