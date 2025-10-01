import React, { useEffect, useState } from "react";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification.js";
import { fournisseurParCategorie } from "../../Service/fournisseur.js";
import { useDispatch, useSelector } from "react-redux";
// import { messageSucces } from "../../globalComponents/Notification.js";
function Fournisseur() {
  const [expandedRows, setExpandedRows] = useState({});
  //   const [stockTheorique, setStockTheorique] = useState({});
  const toggleRow = (idProduit) => {
    setExpandedRows((prev) => ({
      ...prev,
      [idProduit]: !prev[idProduit],
    }));
  };
  const { stateFournisseurParCategorie } = useSelector(
    (state) => state.fournisseurs
  );
  //const [data] = useState(inventaireData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fournisseurParCategorie());
  }, [dispatch]);

  //   const handleStockChange = (lotId, systemStock, value) => {
  //     const val = Number(value) || 0;
  //     setStockTheorique((prev) => ({
  //       ...prev,
  //       [lotId]: {
  //         theorique: val,
  //         ecart: systemStock - val,
  //       },
  //     }));
  //   };

  //   stateFournisseurParCategorie.forEach((item) => {
  //     item.lots.forEach((lot) => {

  //     });
  //   });

  const handleValider = async (id, quantite) => {
    const payload = {
      quantiteLot: quantite,
      idlot: id,
    };
    try {
      console.log({ payload });
      //await dispatch(mettreAJourQuantiteTheorique(payload, dispatch));
      await dispatch(fournisseurParCategorie());
      messageSucces("Opération effectuée avec succès ✅");
    } catch (error) {
      messageErreur("Une erreur est survenue !", error);
      //   console.error("Erreur d’enregistrement ❌", error);
    }
  };
  console.log({ stateFournisseurParCategorie });
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Fournisseur</h5>
        <button
          className="btn btn-success"
          //onClick={() => handleAjouter()}
        >
          + Ajouter
        </button>
      </div>
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
              colSpan={4}
            >
              Nom fournisseur
            </th>

            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
              }}
            >
              Téléphone
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
          {stateFournisseurParCategorie.map((item, index) => {
            return (
              <React.Fragment key={item.produit.id}>
                {/* Ligne produit */}
                <tr
                  style={{
                    color: "black",
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
                    Catégorie : {index + 1}
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
                  item.lots.map((lot) => {
                    return (
                      <tr key={lot.id}>
                        <td
                          style={{ border: "1px solid #000", padding: 8 }}
                        ></td>

                        <td
                          style={{ border: "1px solid #000", padding: 8 }}
                          colSpan={4}
                        >
                          {lot.nom_fournisseur}
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            padding: 8,
                            textAlign: "center",
                          }}
                        >
                          {lot.telephone}
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
                              backgroundColor: "rgba(13, 40, 239, 1)",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleValider(lot.id)}
                          >
                            Modifier
                          </button>
                          <button
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#ef1c09ff",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleValider(lot.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {/* Ligne total */}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Fournisseur;
