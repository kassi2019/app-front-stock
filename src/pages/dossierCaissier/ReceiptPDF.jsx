import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import { formatMontantDevise } from "../../globalComponents/Format";

const ReceiptPDF = forwardRef((props, ref) => {
  const [venteData, setVenteData] = useState(null);
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: "Reçu de vente",
  });

  // Méthode exposée au parent
  useImperativeHandle(ref, () => ({
    print: (data) => {
      setVenteData(data); // injecte la vente
      setTimeout(handlePrint, 200); // impression après petit délai
    },
  }));

  if (!venteData) return null;

  return (
    <div style={{ display: "none" }}>
      <div
        ref={receiptRef}
        style={{
          width: "80mm",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        <h4 style={{ textAlign: "center" }}>🏪 {venteData.magasin}</h4>
        <p style={{ textAlign: "center" }}>
          Vendeur : {venteData.vendeur}
          <br />
          Date : {venteData.date}
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Produit</th>
              <th>Qté</th>
              <th>PU</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {venteData.produits.map((p, i) => (
              <tr key={i}>
                <td>{p.libelle}</td>
                <td style={{ textAlign: "center" }}>{p.quantite}</td>
                <td style={{ textAlign: "right" }}>
                  {formatMontantDevise(p.prix_unitaire)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatMontantDevise(p.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />
        <p>
          <strong>Total :</strong>{" "}
          {formatMontantDevise(venteData.montant_total)}
        </p>
        <p>
          <strong>Reçu :</strong> {formatMontantDevise(venteData.montant_recu)}
        </p>
        <p>
          <strong>Rendu :</strong> {formatMontantDevise(venteData.rendu)}
        </p>

        <hr />
        <p style={{ textAlign: "center" }}>Merci pour votre achat 💚</p>
      </div>
    </div>
  );
});

export default ReceiptPDF;
