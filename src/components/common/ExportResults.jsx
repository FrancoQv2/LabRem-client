import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { getDateNow } from "../../libs/datetime.js";

import BtnDownloadPng from "./BtnDownloadPng"
import BtnDownloadCsv from "./BtnDownloadCsv"

import BtnDownloadCsvProf from "./BtnDownloadCsvProf.jsx";


function ExportResults({ useHook, idLaboratorio, idUsuario,Prof, filename,exportToProfe, componentRef }) {
  const options = {
    staleTime: Infinity,
    cacheTime: Infinity
  }

  const { data: tableData, isLoading } = useHook({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario
  }, options);
  
  const id=idLaboratorio.toString();
  
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
      {Prof=1 ? <BtnDownloadCsvProf 
          useHookProf={exportToProfe}
          idLaboratorio={id}
          filename={"ensayos-convergentes"}
          /> :null}
      
    </>
  )
}

export default ExportResults
