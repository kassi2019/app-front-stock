import React from "react";
import { useLogiqueProduitProvisoire } from "./logiqueProduitProvisoire";
import { formatMontantDevise } from "../../globalComponents/Format";
function ListeProduitProvisoire() {
  const {
    stateProduitProvisoire,
    montantRecu,
    setMontantRecu,
    montantAPayer,
    monnaieRendu,
    handleQuantiteChange,
    handleValider,
  } = useLogiqueProduitProvisoire();

  return (
    <div>
      <h2>Produit Sortant</h2>
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
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "10%",
                textAlign: "center",
              }}
            >
              Code Produit
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "40%",
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
              Prix Unitaire
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                textAlign: "center",
                width: "15%",
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
              }}
            >
              Total Par produit
            </th>
          </tr>
        </thead>

        <tbody>
          {stateProduitProvisoire.map((lot, index) => (
            <tr key={lot.id}>
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
                {lot.tb_produit.code}
              </td>
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
                <input
                  type="number"
                  value={lot.quantite ?? ""}
                  onChange={(e) => handleQuantiteChange(lot.id, e.target.value)}
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
            </tr>
          ))}

          {/* Montant Reçu */}
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: "right",
                padding: 8,
                fontWeight: "bold",
                border: "1px solid #000",
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
              }}
            >
              <input
                type="number"
                style={{
                  width: "180px",
                  textAlign: "right",
                  padding: 5,
                  border: "1px solid #000",
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
