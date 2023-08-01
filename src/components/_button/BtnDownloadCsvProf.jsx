import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { getDateNow } from "@libs/datetime.js"

import BtnDownloadCsv from "./BtnDownloadCsv.jsx"

/**
 * 
 */
function BtnDownloadCsvProf({ useHookProf, idLaboratorio, filename, componentRef }) {
    const options = {
        staleTime: Infinity,
        cacheTime: Infinity
    }

    const { data: tableData, isLoading } = useHookProf({
        idLaboratorio: idLaboratorio
    }, options)

    return (
        <>
            <br></br>
            <Row>
                <Col className="text-center d-grid gap-2">
                    <Button variant="secondary" disabled>
                        Exportar todos los resultados
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
                </Col>
            </Row>
        </>
    )
}

export default BtnDownloadCsvProf