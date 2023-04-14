import { URL_UPDATE_DOCUMENT } from '../assets/endpoints/api.js'
export async function getDocumentServer () {
  const token = window.localStorage.getItem('token')
  const headersList = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const response = await fetch(
    `${URL_UPDATE_DOCUMENT}files%5C10%5CDocumento%20de%20identidad.pdf`,
    {
      method: 'GET',
      headers: headersList
    }
  )
  const blob = await response.blob()

  // Crea un enlace de descarga para el archivo Blob
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Documento de identidad.pdf'
  a.click()

  // Elimina el objeto Blob y el enlace de descarga
  URL.revokeObjectURL(url)
}
