import { useState } from 'react'

export function usePagination ({ elementsInPage, totalElements }) {
  const [currentPage, setCurrentPage] = useState(1)
  const elementsPerPage = elementsInPage

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  const elementsToRender = totalElements.slice(
    (currentPage - 1) * elementsPerPage,
    currentPage * elementsPerPage
  )

  return { handlePageChange, elementsToRender, currentPage }
}
