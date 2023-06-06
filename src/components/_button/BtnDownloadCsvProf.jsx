import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { getDateNow } from "../../libs/datetime.js"

import BtnDownloadPng from "./BtnDownloadPng.jsx"
import BtnDownloadCsv from "./BtnDownloadCsv.jsx"


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
                <Col>
                    <Button variant="secondary" disabled>
                        todos los resultados
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
                            csv total
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default BtnDownloadCsvProf