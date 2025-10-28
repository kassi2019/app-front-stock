import React, { useState } from "react";
import { useLogiqueProduitProvisoire } from "./logiqueProduitProvisoire";
import { formatMontantDevise } from "../../globalComponents/Format";

import { Icons } from "../../globalComponents/Icons";
import { useDispatch } from "react-redux";
import { messageErreur, messageSucces } from "../../globalComponents/Notification";
import { supprimerProduitTemporel } from "../../Service/produit";
function ListeProduitProvisoire() {
  const {
    stateProduitProvisoire,
    montantRecu,
    setMontantRecu,
    montantAPayer,
    monnaieRendu,
    handleQuantiteChange,
    handleValider,
    codeProd,
    handleChangeSetCodeProduit,
    enregistrerProduitParCode,
   
  } = useLogiqueProduitProvisoire();

 const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    content: null,
  });
  const handleSupprimer = (row) => {
  console.log({ row });
    setModalState({
      show: true,
      title: "Confirmer la suppression",
      content: (
        <div>
          <p>
            Voulez-vous vraiment supprimer
            {/* <strong> {row.tb_produit.libelle}</strong> ? */}
          </p>
          <div className="d-flex justify-content-end">
            {/* <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleCloseModal}
            >
              Annuler
            </button> */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => confirmerSuppression(row.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ),
    });
  };

    const confirmerSuppression = async (id) => {
    console.log({ id });
    try {
      await dispatch(supprimerProduitTemporel(id)).unwrap();
      messageSucces("Suppression effectuée avec succès");
      setModalState({ ...modalState, show: false }); // Fermer le modal
    } catch (error) {
      messageErreur("Erreur lors de la suppression", error);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
          Produit Sortant
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px", // espace entre l’input et le bouton
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit..."
            style={{ width: "800px" }}
            value={codeProd}
            onChange={handleChangeSetCodeProduit}
          />

          <button
            className="btn btn-primary btn-sm"
            onClick={() => enregistrerProduitParCode(codeProd)}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Ajouter Produit
          </button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "2%",
                textAlign: "center",
              }}
            >
              N°
            </th>
            {/* <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "10%",
                textAlign: "center",
              }}
            >
              Code Produit
            </th> */}
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "35%",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Produit
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Prix Unitaire
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Qte disponible
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                width: "10%",
                fontSize: "13px",
              }}
            >
              Quantité vendue
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                width: "15%",
                fontSize: "13px",
              }}
            >
              Total Par produit
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                width: "5%",
                fontSize: "13px",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {stateProduitProvisoire.map(
            (lot, index) => (
              console.log({ lot }),
              (
                <tr
                  key={lot.id}
                  style={{
                    backgroundColor:
                      lot.quantite > lot.resteDisponible
                        ? "#ffcccc"
                        : "transparent", // 🔴 fond rouge clair si insuffisant
                    border:
                      lot.quantite > lot.resteDisponible
                        ? "2px solid red"
                        : "1px solid #000", // bordure rouge si insuffisant
                  }}
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
                  {/* <td style={{ border: "1px solid #000", padding: 8 }}>
                {lot.tb_produit.code}
              </td> */}
                  <td style={{ border: "1px solid #000", padding: 8 }}>
                    {lot.tb_produit.libelle}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    {formatMontantDevise(lot.tb_produit.prix_unitaire)}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    {lot.resteDisponible || 0}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    {lot.resteDisponible < lot.quantite && (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                          fontSize: 12,
                        }}
                      >
                        Qte disponible est insuffisante
                      </span>
                    )}
                    <input
                      type="number"
                      value={lot.quantite ?? ""}
                      onChange={(e) =>
                        handleQuantiteChange(lot.id, e.target.value)
                      }
                      style={{
                        width: "180px",
                        textAlign: "right",
                        padding: 5,
                        border: "1px solid #000",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    {lot.tb_produit.prix_unitaire * lot.quantite}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleSupprimer(lot)}
                      style={{ marginRight: "2px", padding: "4px 10px" }}
                    >
                      {Icons.delete}
                    </button>
                  </td>
                </tr>
              )
            )
          )}

          {/* Montant Reçu */}
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: "right",
                padding: 8,
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              Montant Récu
            </td>
            <td
              style={{
                padding: 8,
                textAlign: "right",
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              <input
                type="number"
                style={{
                  width: "180px",
                  textAlign: "right",
                  padding: 5,
                  border: "1px solid #000",
                  fontSize: "13px",
                }}
                value={montantRecu}
                onChange={(e) => setMontantRecu(Number(e.target.value))}
              />
            </td>
          </tr>

          {/* Montant à payer */}
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: "right",
                padding: 8,
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              Montant à payer
            </td>
            <td
              style={{
                padding: 8,
                textAlign: "right",
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              {formatMontantDevise(montantAPayer)}
            </td>
          </tr>

          {/* Monnaie rendu */}
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: "right",
                padding: 8,
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              Monnaie rendu
            </td>
            <td
              style={{
                padding: 8,
                textAlign: "right",
                fontWeight: "bold",
                border: "1px solid #000",
                fontSize: "13px",
              }}
            >
              {formatMontantDevise(monnaieRendu)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ✅ Boutons en bas à droite */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
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
          onClick={handleValider}
        >
          Valider
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

export default ListeProduitProvisoire;
