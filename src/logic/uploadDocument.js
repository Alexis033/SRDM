import { URL_UPDATE_DOCUMENT } from '../assets/endpoints/api'

export async function uploadDocument ({ studentId, filename, newDocument }) {
  const token = window.localStorage.getItem('token')
  const headerList = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const formData = new FormData()
  formData.append('file', newDocument, filename)

  try {
    const response = await fetch(
      `${URL_UPDATE_DOCUMENT}${studentId}?filename=${filename}`,
      {
        method: 'POST',
        headers: headerList,
        body: formData
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return data
    }
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}
