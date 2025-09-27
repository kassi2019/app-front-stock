import React, { useState } from "react";

const TableGlobal = ({
  columns,
  data,
  actions = [],
  defaultRowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Calcul des données à afficher
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Revenir à la première page
  };

  // Générer les numéros de pages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <table id="lang-dt" className="table table-striped table-bordered nowrap">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border p-2 text-left font-bold"
                style={{ width: col.width, textAlign: col.textAlign }}
              >
                {col.title}
              </th>
            ))}
            {actions.length > 0 && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border p-2"
                  style={col.width ? { width: col.width } : {}}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="border p-2 space-x-2">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      className={`underline px-2 py-1 rounded ${
                        action.color === "blue"
                          ? "btn btn-sm btn-primary me-2"
                          : action.color === "red"
                          ? "btn btn-sm btn-danger"
                          : "text-gray-700"
                      }`}
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Zone pagination + sélecteur */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        {/* Sélecteur lignes par page */}
        <div>
          <label className="me-2">Lignes par page :</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="form-select d-inline-block w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        {/* Pagination */}
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Précédent
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableGlobal;
