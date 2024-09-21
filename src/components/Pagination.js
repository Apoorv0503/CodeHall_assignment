import React from 'react';

const Pagination = ({ page, totalPages, handleNext, handlePrev }) => {
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1} className="pagination-button">
        Prev
      </button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={handleNext} disabled={page === totalPages} className="pagination-button">
        Next
      </button>
    </div>
  );
};

export default Pagination;
