import { useNavigate, useParams } from 'react-router'
import { useDocumentList } from '../hooks/useDocumentList'
import { useFetch } from '../hooks/useFetch'
import { getDocumentsStudent } from '../logic/getDocumentsStudent'
import { getDocumentServer } from '../logic/getDocumentServer'
import { updateDocumentStudent } from '../logic/updateDocumentStudent'
import { deleteDocumentStudent } from '../logic/deleteDocumentStudent'

export const ValidationDocumentsStudent = () => {
  const { id, name } = useParams()
  const navigate = useNavigate()
  const { documentList } = useDocumentList()
  const [studentDocuments, error] = useFetch(getDocumentsStudent, id)

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col'>
          <h2 className='text-center mb-4'>{name}</h2>
          <table className='table table-hover border border-5 text-center caption-top'>
            <thead className='table-primary'>
              <tr>
                <th>Documento</th>
                <th>Archivo</th>
                <th>Validar</th>
                <th>Solicitar cambio</th>
              </tr>
            </thead>
            <tbody>
              {documentList.map((document) => {
                const documentStudent = studentDocuments?.find(
                  (documentStudent) => {
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
                              if (documentDB) {
                                getDocumentServer(documentStudent.url_documento)
                              }
                            }}
                          >
                            {documentDB ? 'Documento' : 'No hay Documento'}
                          </a>
                          )}
                    </td>
                    <td>
                      <button
                        type='submit'
                        className='btn btn-success mx-auto'
                        onClick={() => {
                          updateDocumentStudent({
                            idStudent: id,
                            idDocument: document.id,
                            state: 2
                          }).then((response) => {
                            console.log(response)
                          })
                        }}
                      >
                        Validar
                      </button>
                    </td>
                    <td>
                      <button
                        type='submit'
                        className='btn btn-warning mx-auto'
                        onClick={() => {
                          deleteDocumentStudent({
                            idStudent: id,
                            idDocument: document.id,
                            pathDocument: documentStudent?.url_documento
                          }).then(({ responseDB, responseServer }) => {
                            Promise.all([responseDB, responseServer]).then(
                              ([dbResult, serverResult]) => {
                                console.log(dbResult)
                                console.log(serverResult)
                              }
                            )
                          })
                        }}
                      >
                        Solicitar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid m-4'>
        <button
          type='button'
          className='btn btn-primary mx-auto'
          onClick={() => {
            navigate(-1)
          }}
        >
          Regresar a lista de estudiantes
        </button>
      </div>
    </div>
  )
}
