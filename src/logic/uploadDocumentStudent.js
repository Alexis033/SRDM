import { URL_DOCUMENT_STUDENT } from '../assets/endpoints/api'

export async function uploadDocumentStudent ({
  idStudent,
  idDocument,
  urlDocument
}) {
  const token = window.localStorage.getItem('token')
  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const body = {
    id_estudiante: idStudent,
    id_lista_documentos: idDocument,
    estado: '1',
    url_documento: urlDocument
  }
  try {
    const response = await fetch(URL_DOCUMENT_STUDENT, {
      method: 'POST',
      headers: headerList,
      body: JSON.stringify(body)
    })

    const document = await response.json()

    if (!response.ok) {
      return document
    }
    return document
  } catch (err) {
    console.log(err)
    return err
  }
}
