import React, { useEffect, useState } from "react";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import {
  listeProduitInventaire,
  mettreAJourQuantiteTheorique,
} from "../../Service/produit.js";
import {
  afficherQteDisponible,
  AfficherQuantiteEnAttente,
  AfficherQuantiteExpirer,
} from "../../Service/tableauBord.js";
import { useSocketProduit } from "../../Service/useSocketProduit.js";
import { useDispatch, useSelector } from "react-redux";
// import { messageSucces } from "../../globalComponents/Notification.js";
function ControleInventaire() {
  const [expandedRows, setExpandedRows] = useState({});
  const [stockTheorique, setStockTheorique] = useState({});
  const toggleRow = (idProduit) => {
    setExpandedRows((prev) => ({
      ...prev,
      [idProduit]: !prev[idProduit],
    }));
  };
  const { stateProduitInventaire } = useSelector((state) => state.produits);
  //const [data] = useState(inventaireData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listeProduitInventaire());
  }, [dispatch]);

  const handleStockChange = (lotId, systemStock, value) => {
    const val = Number(value) || 0;
    setStockTheorique((prev) => ({
      ...prev,
      [lotId]: {
        theorique: val,
        ecart: systemStock - val,
      },
    }));
  };
  let globalSysteme = 0;
  let globalTheorique = 0;
  let globalEcart = 0;
  stateProduitInventaire.forEach((item) => {
    item.lots.forEach((lot) => {
      const theorique = stockTheorique[lot.id]?.theorique || 0;
      const ecart = stockTheorique[lot.id]?.ecart ?? 0 - lot.quantite;
      globalSysteme += lot.quantite;
      globalTheorique += theorique;
      globalEcart += ecart;
    });
  });

  const allLotsOkGlobal = globalEcart === 0;
  const handleValider = async (id, quantite) => {
    const payload = {
      quantiteLot: quantite,
      idlot: id,
    };
    try {
      await dispatch(mettreAJourQuantiteTheorique(payload, dispatch));
      await dispatch(listeProduitInventaire());
      await dispatch(AfficherQuantiteEnAttente());
      await dispatch(AfficherQuantiteExpirer());
      await dispatch(afficherQteDisponible());
      messageSucces("Opération effectuée avec succès ✅");
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
      //   console.error("Erreur d’enregistrement ❌", error);
    }
  };
  useSocketProduit();
  return (
    <div>
      <h5>Vérification des produits entrants</h5>
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
          {stateProduitInventaire.map((item, index) => {
            // calcul des totaux
            let totalSysteme = 0;
            let totalTheorique = 0;
            let totalEcart = 0;

            const allLotsOk = item.lots.every((lot) => {
              const ecart = stockTheorique[lot.id]?.ecart ?? -lot.quantite;
              return ecart === 0;
            });

            item.lots.forEach((lot) => {
              const theorique = stockTheorique[lot.id]?.theorique || 0;
              // const ecart = stockTheorique[lot.id]?.ecart || (0 - lot.quantite);
              totalSysteme += lot.quantite;
              totalTheorique += theorique;
              totalEcart += theorique - lot.quantite;
            });

            return (
              <React.Fragment key={item.produit.id}>
                {/* Ligne produit */}
                <tr
                  style={{
                    backgroundColor: allLotsOk ? "#d4edda" : "#f2f2f2", // vert si tous lots = 0
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
                    const theorique = stockTheorique[lot.id]?.theorique || "";
                    const ecart = stockTheorique[lot.id]?.ecart ?? 0;

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
                          <input
                            type="number"
                            style={{
                              width: "120px",
                              textAlign: "right",
                              padding: 5,
                              border: "1px solid #000",
                            }}
                            value={theorique}
                            onChange={(e) =>
                              handleStockChange(
                                lot.id,
                                lot.quantite,
                                e.target.value
                              )
                            }
                          />
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
                              backgroundColor: "#4CAF50",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleValider(lot.id, theorique)}
                          >
                            Valider
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {/* Ligne total */}
                {/* {expandedRows[item.produit.id] && (
                  <tr
                    style={{ backgroundColor: "#e6e6e6", fontWeight: "bold" }}
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
                        backgroundColor:
                          totalEcart === 0 ? "#d4edda" : "#f8d7da",
                        color: totalEcart === 0 ? "green" : "red",
                      }}
                    >
                      {totalEcart}
                    </td>
                  </tr>
                )} */}

                {/* Ligne total par produit (toujours visible) */}
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
          <tr
            style={{
              backgroundColor: allLotsOkGlobal ? "#d4edda" : "#f8d7da",
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

export default ControleInventaire;
