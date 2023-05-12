import { URL_DOCUMENT_STUDENT } from '../assets/endpoints/api'

export async function updateDocumentStudent ({
  idStudent,
  idDocument,
  state,
  urlDocument = undefined
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
    estado: state
  }
  if (urlDocument !== undefined) {
    body.url_documento = urlDocument
  }

  try {
    const response = await fetch(URL_DOCUMENT_STUDENT, {
      method: 'PUT',
      headers: headerList,
      body: JSON.stringify(body)
    })

    const documentNewData = await response.json()

    if (!response.ok) {
      return documentNewData
    }
    return documentNewData
  } catch (err) {
    console.log(err)
    return err
  }
}
