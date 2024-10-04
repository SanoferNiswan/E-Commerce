import '../styles.css'; 

const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];
  
    // Push the first two pages
    if (totalPages > 1) {
      pageNumbers.push(1);
      if (totalPages > 1) {
        pageNumbers.push(2);
      }
    }
  
    // Ellipsis before current page block if necessary
    if (currentPage > 4) {
      pageNumbers.push('...');
    }
  
    // Pages around the current page
    const startPage = Math.max(3, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    // Ellipsis after current page block if necessary
    if (currentPage < totalPages - 3) {
      pageNumbers.push('...');
    }
  
    // Push the last two pages
    if (totalPages > 2) {
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    }
  
    return (
      <div className="flex justify-center mt-4">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => pageNumber !== '...' && paginate(pageNumber)}
            className={`pagination-btn mx-1 ${pageNumber === currentPage ? 'selected' : ''}`}
            disabled={pageNumber === '...'}
          >
            {pageNumber}
          </button>
        ))}
      </div>

    );
  };
  
  export default Pagination;
  