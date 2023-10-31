import { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { submitSuccess, submitError } from '@libs/alerts'

function FileUpload({ URL }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleFileUpload = () => {
    const formData = new FormData()
    formData.append('file', selectedFile)

    axios
      .post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('File uploaded successfully')
        console.log(response)
        submitSuccess(response.data)
      })
      .catch((error) => {
        console.error('File upload failed', error)
        submitError('File upload failed')
      })
  }

  return (
    <div>
      <hr />
      <Row className='mt-3'>
        <Col sm={12} md={12} lg={12}>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Suba un archivo .osf</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-3 d-flex align-items-end'>
        <Col sm={12} md={12} lg={12}>
          <Button size='sm' onClick={handleFileUpload}>
            Upload File
          </Button>
        </Col>
      </Row>
      <hr />
    </div>
  )
}

export default FileUpload
