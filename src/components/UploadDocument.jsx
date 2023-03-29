import { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { getListDocuments } from '../logic/getListDocuments'
import { ModalContext } from '../context/modal'
import { uploadDocument } from '../logic/uploadDocument'

export const UploadDocument = ({ studentId }) => {
  const [documentList, setDocumentList] = useState([])
  const { handleShow, setMessage } = useContext(ModalContext)

  useEffect(() => {
    const fetchFuntion = async () => {
      const listDocuments = await getListDocuments()
      setDocumentList(listDocuments)
    }
    fetchFuntion()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    const files = []
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files.push([key, value])
      }
    }
    console.log(files)

    let tempMessage = ''
    files.forEach((file) => {
      if (file[1].size === 0) {
        tempMessage += `No ha cargado un archivo para: ${file[0]}. \n`
      } else if (file[1].type !== 'application/pdf') {
        tempMessage += `Formato no valido para: ${file[0]}.\n `
      } else {
        const response = uploadDocument({
          studentId,
          filename: file[0],
          newDocument: file[1]
        })
        const urlDocument = response.file_location
        console.log(response)
        console.log(urlDocument)
        // to do: enviar url a la base de datos
        tempMessage += `Documento subido exitosamente para: ${file[0]}.\n`
      }
    })

    setMessage(tempMessage)
    setTimeout(() => {
      handleShow()
    }, 900)
    // setMessage('')
  }

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <form
            action=''
            id='formulario-cargar-archivos'
            onSubmit={handleSubmit}
          >
            <table className='table table-hover border border-5'>
              <thead className='table-primary text-center'>
                <tr>
                  <th>Documento</th>
                  <th>Archivo PDF</th>
                </tr>
              </thead>
              <tbody>
                {documentList.map((document) => {
                  return (
                    <tr key={document.id}>
                      <td>{document.nombre_documento}</td>
                      <td className='text-center'>
                        <input
                          type='file'
                          accept='application/pdf'
                          name={`${document.nombre_documento}.pdf`}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='mb-4 form-check m-3' action='#'>
              <input
                type='checkbox'
                name='consentimiento'
                className='form-check-input'
                id='consentimiento'
                value='si'
                required
              />
              <label
                htmlFor='consentimiento'
                className='form-check-label col-12'
              >
                Consentimiento de manejo de información
              </label>
            </div>

            <div className='d-flex justify-content-center mt-3'>
              <Button type='submit' variant='primary'>
                Subir documentos
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
