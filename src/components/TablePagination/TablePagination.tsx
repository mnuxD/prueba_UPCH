import React from "react";

import "./styles.css";

const TablePagination = () => {
  return (
    <div className="container">
      <div className="rowsPage">
        <label>Filas por página:</label>
        <select className="custom-select custom-select-lg">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
