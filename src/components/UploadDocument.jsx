import Button from 'react-bootstrap/Button'
import { useDocumentList } from '../hooks/useDocumentList'
/**
Uploads a document for a given student.
param {Object} props - The props object.
param {string} props.studentId - The ID of the student.
 */
export function UploadDocument ({ studentId }) {
  const { documentList, handleSubmitList } = useDocumentList(studentId)
  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <form
            action=''
            id='formulario-cargar-archivos'
            onSubmit={handleSubmitList}
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
                          id={document.id}
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
