import { useState } from 'react'
import axios from 'axios'

// const URL = 'http://localhost:3034/upload'

function FileUpload({URL}) {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleFileUpload = () => {
    const formData = new FormData()
    formData.append('file', selectedFile)

    axios.post(URL, formData)
      .then(response => {
        console.log('File uploaded successfully')
      })
      .catch(error => {
        console.error('File upload failed', error)
      })
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  )
}

export default FileUpload