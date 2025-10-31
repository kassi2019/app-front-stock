import React, { useState } from "react";
import { useLogiqueProduitProvisoire } from "./logiqueProduitProvisoire";
import { formatMontantDevise } from "../../globalComponents/Format";
import { Modal, Button } from "react-bootstrap";
import { Icons } from "../../globalComponents/Icons";
import { useDispatch } from "react-redux";
import {
  messageErreur,
  messageSucces,
} from "../../globalComponents/Notification";
import {
  supprimerProduitsTemporelsCochet,
  supprimerProduitTemporel,
} from "../../Service/produit";
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
  // --- État pour le modal de confirmation
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    content: null,
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // décocher
          : [...prev, id] // cocher
    );
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(stateProduitProvisoire.map((lot) => lot.id));
    } else {
      setSelectedIds([]);
    }
  };
  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
  };
  // --- Fonction appelée au clic sur "Supprimer"
  const handleSupprimer = (row) => {
    setModalState({
      show: true,
      title: "Confirmer la suppression",
      content: (
        <div>
          <p>
            Voulez-vous vraiment supprimer{" "}
            <strong>{row.tb_produit.libelle}</strong> ?
          </p>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleCloseModal}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmerSuppression(row.id)}
            >
              Supprimer
            </Button>
          </div>
        </div>
      ),
    });
  };
  const handleSupprimerSelection = () => {
    if (selectedIds.length < 2) {
      messageErreur("Veuillez sélectionner au moins deux produits");
      return;
    }

    setModalState({
      show: true,
      title: "Confirmer l' annulation des produits",
      content: (
        <div>
          <p>
            Voulez-vous vraiment Annuler{" "}
            <strong>{selectedIds.length} produit(s)</strong> sélectionné(s) ?
          </p>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleCloseModal}
            >
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmerSuppressionSelection}>
              Confirmer
            </Button>
          </div>
        </div>
      ),
    });
  };
  const confirmerSuppressionSelection = async () => {
    try {
      await dispatch(supprimerProduitsTemporelsCochet(selectedIds)).unwrap();
      messageSucces("Annulation effectuée avec succès");
      setSelectedIds([]); // vide la sélection après suppression
      setModalState({ ...modalState, show: false });
    } catch (error) {
      messageErreur("Erreur lors de la suppression", error);
    }
  };

  const confirmerSuppression = async (id) => {
    try {
      await dispatch(supprimerProduitTemporel(id)).unwrap();
      messageSucces("Suppression effectuée avec succès");
      setModalState({ ...modalState, show: false });
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
            <th
              style={{
                border: "1px solid #000",
                padding: 8,
                width: "2%",
                textAlign: "center",
              }}
            >
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedIds.length > 0 &&
                  selectedIds.length === stateProduitProvisoire.length
                }
              />
            </th>

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
            {stateProduitProvisoire.length > 0 && (
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
            )}
          </tr>
        </thead>

        <tbody>
          {stateProduitProvisoire.map((lot, index) => (
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
              <td
                style={{
                  border: "1px solid #000",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(lot.id)}
                  onChange={() => handleCheckboxChange(lot.id)}
                />
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
                  textAlign: "center",
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
          ))}

          {/* Montant Reçu */}
          <tr>
            <td
              colSpan={6}
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
              colSpan={6}
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
              colSpan={6}
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
          onClick={handleSupprimerSelection}
        >
          Annuler Produit
        </button>
      </div>
      {/* ✅ Modal de confirmation */}
      <Modal show={modalState.show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalState.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalState.content}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ListeProduitProvisoire;
