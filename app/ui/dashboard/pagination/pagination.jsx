import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const totalPagesToShow = 10; // Количество видимых страниц

  const renderPagination = () => {
    const startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <input
          key={i}
          type="radio"
          name="options"
          aria-label={`${i}`}
          className={`join-item btn btn-square ${
            currentPage === i ? "btn-primary" : ""
          }`}
          onClick={() => onPageChange(i)}
          checked={currentPage === i}
          readOnly
        />
      );
    }

    return (
      <>
        <input
          type="radio"
          name="options"
          aria-label="Назад"
          className={`join-item btn btn-square`}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          readOnly
        />
        {pages}
        <input
          type="radio"
          name="options"
          aria-label="Вперед"
          className={`join-item btn btn-square`}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          readOnly
        />
      </>
    );
  };

  return (
    <div className="pagination join mt-4">
      {renderPagination()}
    </div>
  );
};

export default Pagination;
