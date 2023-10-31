import { useState, useEffect } from 'react'
import axios from 'axios'

const WiFiSignalStrength = ({ antennaUrl }) => {
  const [signalStrength, setSignalStrength] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(antennaUrl)
        const wifiData = response.data
        setSignalStrength(wifiData.signalStrength)
      } catch (error) {
        console.error('Error fetching WiFi data:', error)
      }
    }

    const intervalId = setInterval(fetchData, 1000) // Fetch data every second

    return () => {
      clearInterval(intervalId) // Clean up the interval on unmount
    }
  }, [])

  const containerStyles = {
    height: '50px',
    border: '2px solid #000',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={containerStyles}>
      {signalStrength !== null ? (
        <p style={{}}>
          <b>Intensidad de señal actual:</b> {signalStrength} dBm
        </p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default WiFiSignalStrength
