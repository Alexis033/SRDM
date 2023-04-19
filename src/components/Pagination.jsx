/**
Returns a pagination component with clickable buttons for each page
param {number} currentPage - The current active page
param {number} totalPages - The total number of pages
param {function} onPageChange - The function to call when a page is clicked
*/
export function Pagination ({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const maxPagesToShow = 5
  const showEllipsis = totalPages > maxPagesToShow

  let startPage = 1
  let endPage = totalPages

  if (showEllipsis) {
    const half = Math.floor(maxPagesToShow / 2)
    startPage = currentPage - half
    endPage = currentPage + half
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1
      startPage = 1
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages
      endPage = totalPages
    }
  }

  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            {'<<'}
          </button>
        </li>
        <li>
          <button
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
        </li>
        {showEllipsis && startPage > 1 && (
          <li className='page-item disabled'>
            <span className='page-link'>...</span>
          </li>
        )}
        {pages.slice(startPage - 1, endPage).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <button className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        {showEllipsis && endPage < totalPages && (
          <li className='page-item disabled'>
            <span className='page-link'>...</span>
          </li>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className='page-link'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </li>
        <li>
          <button
            className='page-link'
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
