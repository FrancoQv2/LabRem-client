import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { getDateNow } from "../../libs/datetime.js";

import BtnDownloadPng from "./BtnDownloadPng"
import BtnDownloadCsv from "./BtnDownloadCsv"

function ExportResults({ useHook, idLaboratorio, idUsuario, filename, componentRef }) {
  const options = {
    staleTime: Infinity,
    cacheTime: Infinity
  }

  const { data: tableData, isLoading } = useHook({
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
            <BtnDownloadCsv 
              data={tableData}
              filename={`${filename}-${getDateNow()}.csv`}
            />
          ) : (
            <Button variant="secondary" className="mx-2" disabled>
              csv
            </Button>
          )}

          <BtnDownloadPng 
            componentRef={componentRef}
            filename={`${filename}-${getDateNow()}`}
          />
        </Col>
      </Row>
    </>
  )
}

export default ExportResults
