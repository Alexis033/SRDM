import { useState, useContext, useEffect } from 'react'
import { ModalContext } from '../context/modal'
import { getListDocuments } from '../logic/getListDocuments'
import { uploadDocument } from '../logic/uploadDocument'
import { uploadDocumentStudent } from '../logic/uploadDocumentStudent'

export function useDocumentList (studentId) {
  const [documentList, setDocumentList] = useState([])
  const { handleShow, setMessage } = useContext(ModalContext)

  useEffect(() => {
    const fetchFunction = async () => {
      const listDocuments = await getListDocuments()
      setDocumentList(listDocuments)
    }
    fetchFunction()
  }, [])

  const handleSubmitList = (event) => {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    const files = []
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const inputId = event.target.querySelector(`[name="${key}"]`).id
        files.push({ id: inputId, fileName: key, file: value })
      }
    }
    // console.log(files)

    let tempMessage = ''
    files.forEach(async (file) => {
      if (file.file.size === 0) {
        tempMessage += `No ha cargado un archivo para: ${file.fileName}. \n`
      } else if (file.file.type !== 'application/pdf') {
        tempMessage += `Formato no valido para: ${file.fileName}.\n `
      } else {
        const response = await uploadDocument({
          studentId,
          filename: file.fileName,
          newDocument: file.file
        })
        const urlDocument = response.file_location

        if (response === '') {
          tempMessage += `No pudo cargarse documento para: ${file.fileName}.\n`
        } else {
          const responseDB = await uploadDocumentStudent({
            idStudent: studentId,
            idDocument: file.id,
            urlDocument
          })

          if (responseDB.detail) {
            tempMessage += `${responseDB.detail}, ha modificado: ${file.fileName}.\n`
          } else {
            tempMessage += `Documento subido exitosamente para: ${file.fileName}.\n`
          }
        }
        await setMessage(tempMessage)
      }
    })

    setMessage(tempMessage)
    handleShow()
  }
  return { documentList, handleSubmitList }
}
