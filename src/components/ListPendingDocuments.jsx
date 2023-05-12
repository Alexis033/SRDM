import { useDocumentList } from '../hooks/useDocumentList'
import { getDocumentsStudent } from '../logic/getDocumentsStudent'
import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { getDocumentServer } from '../logic/getDocumentServer'

/**
 ListPendingDocuments - Displays a table of pending documents for a given student
 param {Object} studentId - The id of the student whose documents will be displayed
 */

export const ListPendingDocuments = ({ studentId }) => {
  const { documentList } = useDocumentList()
  const [studentDocuments, error] = useFetch(getDocumentsStudent, studentId)

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <h2 className='text-center mb-4'>Estado de Documentos</h2>
      <div className='row'>
        <div className='col'>
          <table className='table table-hover border border-5 text-center caption-top'>
            <thead className='table-primary'>
              <tr>
                <th>Documento</th>
                <th>Archivo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {documentList.map((document) => {
                const documentStudent = studentDocuments?.find(
                  (documentStudent, index) => {
                    return documentStudent.id_lista_documentos === document.id
                  }
                )
                const documentDB = documentStudent?.url_documento

                return (
                  <tr key={document.id}>
                    <td>{document.nombre_documento}</td>
                    <td>
                      {error
                        ? (
                            'Error al cargar archivo'
                          )
                        : (
                          <a
                            href={!documentDB ? undefined : '#'}
                            onClick={(event) => {
                              event.preventDefault()
                              if (documentStudent?.url_documento) {
                                getDocumentServer(documentStudent.url_documento)
                              }
                            }}
                          >
                            {documentStudent?.url_documento
                              ? 'Documento'
                              : 'No hay Documento'}
                          </a>
                          )}
                    </td>

                    <td>
                      {documentStudent?.estado == 1
                        ? 'Entregado'
                        : documentStudent?.estado == 2
                          ? 'Aprobado'
                          : 'Pendiente'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid m-3'>
        <Link className='btn btn-primary mx-auto' to='/uploadDocuments'>
          Regresar a cargar documentos
        </Link>
      </div>
    </div>
  )
}
