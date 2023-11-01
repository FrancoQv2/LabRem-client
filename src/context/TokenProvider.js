import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function TokenProvider({ children }) {
  // Obtencion y decodificacion de token por parametro URL
  const location = useLocation()
  const token = new URLSearchParams(location.search).get('token')

  useEffect(() => {
    if (token) {
      try {
        const informacion = jwtDecode(token)
        localStorage.setItem('token', token)
        localStorage.setItem('informacion', JSON.stringify(informacion))

        // Elimina el parámetro 'token' de la URL
        const baseURL = window.location.pathname
        window.history.replaceState({}, document.title, baseURL)
      } catch (error) {
        console.error('Error al decodificar el token:', error)
      }
    }
  }, [token])

  return children
}

export default TokenProvider
