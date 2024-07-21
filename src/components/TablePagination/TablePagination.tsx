import React from "react";

import "./styles.css";

interface Props {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  handlePaginate: (pageNumber: number) => void;
  currentPage: number;
  totalItems: number;
}

const TablePagination = ({
  pageSize,
  setPageSize,
  handlePaginate,
  currentPage,
  totalItems
}: Props) => {
  const totalPages =
    totalItems % pageSize !== 0
      ? Math.ceil(totalItems / pageSize)
      : totalItems / pageSize;

  const paginationArrayNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePaginate(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePaginate(currentPage + 1);
  };

  const ButtonPageNumber = ({ pageNumber }: { pageNumber: number }) => {
    return (
      <li className={`page-item ${currentPage === pageNumber && "active"}`}>
        <button
          className="page-link"
          style={{ width: 40 }}
          onClick={() => handlePaginate(pageNumber)}
        >
          {pageNumber}
        </button>
      </li>
    );
  };

  const ButtonEllipsis = () => {
    return (
      <li className="page-item">
        <button className="page-link" style={{ width: 40 }}>
          ...
        </button>
      </li>
    );
  };

  return (
    <div className="table-pagination">
      <div className="rowsPage">
        <label>Filas por página:</label>
        <select
          onChange={(e) => {
            setPageSize(+e.target.value);
          }}
          className="custom-select custom-select-lg"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={handlePreviousPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {totalPages <= 5 &&
            paginationArrayNumbers.map((paginationNumber: number) => (
              <ButtonPageNumber
                pageNumber={paginationNumber}
                key={paginationNumber}
              />
            ))}

          {totalPages > 5 && (
            <>
              <ButtonPageNumber pageNumber={1} />
              {currentPage === 1 || currentPage === 2 || currentPage === 3 ? (
                <ButtonPageNumber pageNumber={2} />
              ) : (
                <ButtonEllipsis />
              )}

              {currentPage === 1 || currentPage === 2 ? (
                <ButtonPageNumber pageNumber={3} />
              ) : currentPage === totalPages ||
                currentPage === totalPages - 1 ? (
                <ButtonPageNumber pageNumber={totalPages - 2} />
              ) : (
                <ButtonPageNumber pageNumber={currentPage} />
              )}

              {currentPage === totalPages ||
              currentPage === totalPages - 1 ||
              currentPage === totalPages - 2 ? (
                <ButtonPageNumber pageNumber={totalPages - 1} />
              ) : (
                <ButtonEllipsis />
              )}

              <ButtonPageNumber pageNumber={totalPages} />
            </>
          )}

          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={handleNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
