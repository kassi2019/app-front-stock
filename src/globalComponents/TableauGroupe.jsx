import React from "react";

const TableauGroupe = ({ columns, data, actions = [] }) => {
  console.log({ data });
  // Regrouper les données par "groupBy" (ex: type_equipement)
  const groupedData = data.reduce((acc, item) => {
    const key = item.tb_equipements?.libelle || "Autres"; // ✅ libellé au lieu de l'ID
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <table className="table table-bordered">
      <thead className="bg-teal-700 text-white">
        <tr style={{ backgroundColor: "#007b9a", color: "white" }}>
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-2 text-center"
              style={{ color: "white" }}
            >
              {col.title}
            </th>
          ))}
          {actions.length > 0 && <th className="p-2 text-center">Action</th>}
        </tr>
      </thead>

      <tbody>
        {Object.entries(groupedData).map(
          ([group, rows], groupIndex) => (
            console.log({ group, rows, groupIndex }),
            (
              <React.Fragment key={groupIndex}>
                {/* Ligne de titre du groupe */}
                <tr
                  className="bg-yellow-700 text-black font-bold"
                  style={{
                    backgroundColor: "#a67e2e",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                    Type équipement : {group}
                  </td>
                </tr>

                {/* Lignes de données */}
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="p-2">
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="p-2 text-center space-x-2">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            className={`btn btn-sm ${
                              action.color === "green"
                                ? "btn-success"
                                : "btn-danger"
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
              </React.Fragment>
            )
          )
        )}
      </tbody>
    </table>
  );
};

export default TableauGroupe;
