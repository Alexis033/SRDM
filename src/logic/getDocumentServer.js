import { URL_UPDATE_DOCUMENT } from '../assets/endpoints/api.js'
export async function getDocumentServer (urlFile) {
  const token = window.localStorage.getItem('token')
  const headersList = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  urlFile = urlFile.replaceAll(' ', '%20')
  urlFile = urlFile.replaceAll('\\', '%5C')

  const response = await fetch(`${URL_UPDATE_DOCUMENT}${urlFile}`, {
    method: 'GET',
    headers: headersList
  })
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
