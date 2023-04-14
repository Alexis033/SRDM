import { URL_DOCUMENT_STUDENT } from '../assets/endpoints/api'

export async function getDocumentsStudent (idStudent) {
  const token = window.localStorage.getItem('token')
  try {
    const headersList = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await fetch(`${URL_DOCUMENT_STUDENT}${idStudent}`, {
      method: 'GET',
      headers: headersList
    })
    const listDocuments = await response.json()

    if (!response.ok) throw new Error('No se han encontrado documentos')

    return listDocuments
  } catch (err) {
    console.log(err)
    throw err
  }
}
