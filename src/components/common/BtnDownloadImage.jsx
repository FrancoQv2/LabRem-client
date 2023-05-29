import Button from "react-bootstrap/Button"
import { getDateNow } from "../../libs/datetime.js"

function BtnDownloadImage() {
  const url = 'http://192.168.100.126:8080/photo.jpg'
  const filename = 'imagen-lab'
  
  const handleClick = async (e) => {
    e.preventDefault()

    console.log(url)
    fetch(url)
    .then((response) => response.blob())
      .then((blob) => {
        const urlBlob = URL.createObjectURL(blob)
        const link = document.createElement("a")
        
        link.href = urlBlob
        link.download =`${filename}-${getDateNow()}.jpg` // Reemplaza con el nombre que desees darle al archivo
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
  }

  return (
    <Button variant="warning" onClick={handleClick}>
      Capturar imagen
    </Button>
  )
}

export default BtnDownloadImage
