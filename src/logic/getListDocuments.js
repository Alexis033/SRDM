import { URL_LIST_DOCUMENTS } from '../assets/endpoints/api'

export async function getListDocuments () {
  const token = window.localStorage.getItem('token')
  try {
    const headersList = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response = await fetch(URL_LIST_DOCUMENTS, {
      method: 'GET',
      headers: headersList
    })
    const listDocuments = await response.json()

    if (!response.ok) throw new Error('No se han encontrado documentos')

    return listDocuments
  } catch (err) {
    console.log(err)
  }
}
