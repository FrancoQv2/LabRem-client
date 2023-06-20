import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { getDateNow } from "../../libs/datetime.js"

import BtnDownloadPng from "../_button/BtnDownloadPng.jsx"
import BtnDownloadCsv from "../_button/BtnDownloadCsv.jsx"

// Necesario para no realizar la query más de una vez
import BtnDownloadCsvProf from "../_button/BtnDownloadCsvProf.jsx"

/**
 * Este componente realiza dos acciones:
 * - Para csv realiza una query usando el hook useEnsayosUsuarios y obtener toda la data más reciente
 * - Para png necesita la Red del componente Tabla actual
 */
function ExportResults({ useHook, idLaboratorio, idUsuario, Prof, filename, exportToProfe, componentRef }) {
  const options = {
    staleTime: Infinity,
    cacheTime: Infinity
  }

  const { data: tableData, isLoading } = useHook({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario
  }, options)

  const id = idLaboratorio.toString()

  return (
    <>
      <Row>
        <Col className="text-center d-grid gap-2">
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

      {Prof ?
        <BtnDownloadCsvProf
          useHookProf={exportToProfe}
          idLaboratorio={id}
          filename={filename}
        /> : null}
    </>
  )
}

export default ExportResults
