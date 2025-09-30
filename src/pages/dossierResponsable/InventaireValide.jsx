import React, { useEffect, useState } from "react";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import {
  listeProduitValide,
  RamenerQuantiteTheorique,
} from "../../Service/produit.js";
import { useDispatch, useSelector } from "react-redux";

function InventaireValide() {
  const [expandedRows, setExpandedRows] = useState({});
  const [stockTheorique] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState(null);

  const openConfirm = (id) => {
    setSelectedLotId(id);
    setShowConfirm(true);
  };
  const toggleRow = (idProduit) => {
    setExpandedRows((prev) => ({
      ...prev,
      [idProduit]: !prev[idProduit],
    }));
  };
  const { stateProduitValide } = useSelector((state) => state.produits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listeProduitValide());
  }, [dispatch]);

  // === Totaux globaux ===
  let globalSysteme = 0;
  let globalTheorique = 0;
  let globalEcart = 0;

  stateProduitValide.forEach((item) => {
    item.lots.forEach((lot) => {
      // Stock théorique = valeur saisie ou valeur déjà existante en BDD
      const theorique =
        stockTheorique[lot.id]?.theorique ?? lot.quantite_theorique ?? 0;

      const ecart = theorique - lot.quantite;

      globalSysteme += lot.quantite;
      globalTheorique += theorique;
      globalEcart += ecart;
    });
  });

  const allLotsOkGlobal = globalEcart === 0;

  //   const handleValider = async (id) => {
  //     const payload = {
  //       idlot: id,
  //     };
  //     try {
  //       await dispatch(RamenerQuantiteTheorique(payload, dispatch));
  //       await dispatch(listeProduitValide());
  //       messageSucces("Opération effectuée avec succès ✅");
  //     } catch (error) {
  //       messageErreur("Une erreur est survenue !", error);
  //     }
  //   };
  const confirmAction = async () => {
    const payload = { idlot: selectedLotId };
    try {
      await dispatch(RamenerQuantiteTheorique(payload, dispatch));
      await dispatch(listeProduitValide());
      messageSucces("Opération effectuée avec succès ✅");
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
    } finally {
      setShowConfirm(false);
      setSelectedLotId(null);
    }
  };
  return (
    <div>
      <div>
        {/* ... ton tableau ... */}

        {/* Fenêtre de confirmation */}
        {showConfirm && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowConfirm(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Voulez-vous vraiment valider cette opération ?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowConfirm(false)}
                  >
                    Annuler
                  </button>
                  <button className="btn btn-success" onClick={confirmAction}>
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h5>Produit validé</h5>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              N°
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Produit
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Lot Produit
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Stock Système
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Stock Théorique
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Acteur
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Écart
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {stateProduitValide.map((item, index) => {
            // === Totaux par produit ===
            let totalSysteme = 0;
            let totalTheorique = 0;
            let totalEcart = 0;

            const allLotsOk = item.lots.every((lot) => {
              const theorique =
                stockTheorique[lot.id]?.theorique ??
                lot.quantite_theorique ??
                0;
              return theorique - lot.quantite === 0;
            });

            item.lots.forEach((lot) => {
              const theorique =
                stockTheorique[lot.id]?.theorique ??
                lot.quantite_theorique ??
                0;
              const ecart = theorique - lot.quantite;

              totalSysteme += lot.quantite;
              totalTheorique += theorique;
              totalEcart += ecart;
            });

            return (
              <React.Fragment key={item.produit.id}>
                {/* Ligne produit */}
                <tr
                  style={{
                    backgroundColor: allLotsOk ? "#fdfefdff" : "#f2f2f2",
                    color: allLotsOk ? "green" : "black",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => toggleRow(item.produit.id)}
                >
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #000", padding: 8 }}>
                    {expandedRows[item.produit.id] ? "▼ " : "▶ "}
                    {item.produit.libelle}
                  </td>
                  <td
                    style={{ border: "1px solid #000", padding: 8 }}
                    colSpan={6}
                  ></td>
                </tr>

                {/* Lignes lots */}
                {expandedRows[item.produit.id] &&
                  item.lots.map((lot, lotIndex) => {
                    const theorique =
                      stockTheorique[lot.id]?.theorique ??
                      lot.quantite_theorique ??
                      0;
                    const ecart = theorique - lot.quantite;

                    return (
                      <tr key={lot.id}>
                        <td
                          style={{ border: "1px solid #000", padding: 8 }}
                        ></td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            fontStyle: "italic",
                          }}
                        >
                          Lot {lotIndex + 1}
                        </td>
                        <td style={{ border: "1px solid #000", padding: 8 }}>
                          {lot.code_lot}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          {lot.quantite}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          {theorique}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          {lot.user.noms_prenoms}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                            backgroundColor:
                              ecart === 0 ? "#d4edda" : "#f8d7da",
                            color: ecart === 0 ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {ecart}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "rgba(239, 46, 16, 1)",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => openConfirm(lot.id)}
                          >
                            Annuler
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {/* Ligne total par produit */}
                <tr
                  style={{
                    backgroundColor: allLotsOk ? "#d4edda" : "#e6e6e6",
                    fontWeight: "bold",
                  }}
                >
                  <td
                    colSpan={3}
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    Total {item.produit.libelle}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {totalSysteme}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {totalTheorique}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  ></td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                      backgroundColor: totalEcart === 0 ? "#d4edda" : "#f8d7da",
                      color: totalEcart === 0 ? "green" : "red",
                    }}
                  >
                    {totalEcart}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "center",
                    }}
                  ></td>
                </tr>
              </React.Fragment>
            );
          })}

          {/* Ligne total global */}
          <tr
            style={{
              backgroundColor: allLotsOkGlobal
                ? "rgba(244, 212, 118, 1)"
                : "#f3f2f2ff",
              fontWeight: "bold",
            }}
          >
            <td
              colSpan={3}
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "right",
              }}
            >
              Total global
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              {globalSysteme}
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              {globalTheorique}
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            ></td>
            <td
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                color: allLotsOkGlobal ? "green" : "red",
              }}
            >
              {globalEcart}
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InventaireValide;
