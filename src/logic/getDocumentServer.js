import { URL_UPDATE_DOCUMENT } from '../assets/endpoints/api.js'
export async function getDocumentServer (urlFile) {
  const token = window.localStorage.getItem('token')
  const headersList = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  let file = urlFile.replaceAll(' ', '%20')
  file = urlFile.replaceAll('\\', '%5C')

  const response = await fetch(`${URL_UPDATE_DOCUMENT}${file}`, {
    method: 'GET',
    headers: headersList
  })
  const blob = await response.blob()

  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  // Crea un enlace de descarga para el archivo Blob
  // const nameFile = urlFile.split('\\').at(-1)
  // const a = document.createElement('a')
  // a.href = url
  // a.download = nameFile
  // a.click()

  URL.revokeObjectURL(url)
}
