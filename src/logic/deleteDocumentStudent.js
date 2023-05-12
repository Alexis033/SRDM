import {
  URL_DOCUMENT_STUDENT,
  URL_UPDATE_DOCUMENT
} from '../assets/endpoints/api'

const deleteFromDB = async (token, idStudent, idDocument) => {
  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const body = {
    id_estudiante: idStudent,
    id_lista_documentos: idDocument
  }

  try {
    const response = await fetch(URL_DOCUMENT_STUDENT, {
      method: 'DELETE',
      headers: headerList,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      return 'Error al eliminar el documento'
    }
    return 'Documento eliminado'
  } catch (err) {
    console.log(err)
    return err
  }
}
const deleteFromServer = async (token, pathDocument) => {
  let path = pathDocument
  path = path?.replaceAll(' ', '%20')
  path = path?.replaceAll('\\', '%5C')

  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  try {
    const response = await fetch(`${URL_UPDATE_DOCUMENT}delete/${path}`, {
      method: 'DELETE',
      headers: headerList
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}
export async function deleteDocumentStudent ({
  idStudent,
  idDocument,
  pathDocument
}) {
  const token = window.localStorage.getItem('token')
  const responseDB = deleteFromDB(token, idStudent, idDocument)
  const responseServer = deleteFromServer(token, pathDocument)
  return {
    responseDB,
    responseServer
  }
}
