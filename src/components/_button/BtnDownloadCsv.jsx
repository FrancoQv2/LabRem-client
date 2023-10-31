import Button from 'react-bootstrap/Button'

import { CSVLink } from 'react-csv'

import { downloadCsvSuccess, downloadCsvInfo, downloadCsvError } from '@libs/alerts'

/**
 * Devuelve un componente Button con la funcionalidad de descargar un archivo csv
 * @param data json el cual será parseado a csv
 * @param filename nombre del archivo a generar con el formato "string-YY-MM-DD"
 */
function BtnDownloadCsv({ data, filename }) {
  return (
    <Button variant='success' className='mx-2'>
      <CSVLink
        className='text-decoration-none text-light'
        data={data}
        target='_blank'
        filename={filename}
        onClick={() => {
          try {
            downloadCsvInfo()
          } catch (error) {
            downloadCsvError()
          }
        }}
      >
        csv
      </CSVLink>
    </Button>
  )
}

export default BtnDownloadCsv
