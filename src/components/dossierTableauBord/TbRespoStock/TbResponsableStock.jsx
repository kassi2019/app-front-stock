// src/components/DashboardResponsable.jsx
import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControleInventaire from "../../../pages/dossierResponsable/ControleInventaire";
import { useLogiqueTbResponsableStock } from "./logiqueTbResponsableStock";

import InfoCardTbResponsable from "./InfoCardTbResponsable";
import Graphe1Quantite from "./graphe1Quantite";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";
import Graphe2QteExpirer from "./graphe2QteExpirer";
import Graphe3QteQuotidienneJrs from "./graphe3QteQuotidienneJrs";
import Graphe5QteQuotidienneAnnee from "./graphe5QteQuotidienneAnnee";
// import Graphe6ProduitPlusVendu from "./graphe6ProduitPlusVendu";
import Graphe6MontantQuotidienneAnnee from "./graphe6MontantQuotidienneAnnee";
import Graphe4MontantQuotidienneJrs from "./graphe4MontantQuotidienneJrs";
import Graphe8MontantQuotidienneMois from "./graphe8MontantQuotidienneMois";
import Graphe7QteQuotidienneMois from "./graphe7QteQuotidienneMois";

const DashboardResponsable = () => {
  const {
    stateQteDisponible,
    stateQteEnAttente,
    stateQteExpire,
    // stateQteRentrantParMois,
    //stateProduitExpire,
    stateDetaiQuantiteDisponible,
    stateDetaiQuantiteEnAttente,
    stateDetailQuantiteExpirationBientot,
    stateDetailQuantiteExpirationAujourdHui,
    stateDetailQuantiteQuantiteDetruite,
    stateDetailQuantiteQuantiteNonDetruite,
    stateProduitInventaire
  } = useLogiqueTbResponsableStock();
  // État pour la période sélectionnée
  const [periode, setPeriode] = useState("jour");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", value: 0 });
  
  const [modalContent, setModalContent] = useState([]);
  const handleOpenModal = (title, value) => {
    setModalData({ title, value });

    // 🔹 Exemple de contenu dynamique selon la carte cliquée :
    switch (title) {
      case "📦 Stock dispo":
        setModalContent(stateDetaiQuantiteDisponible);
        break;

      case "⚠️ Qté En attente":
        setModalContent(stateDetaiQuantiteEnAttente);
        break;

      case "⏳ Qté Bientôt expiré":
        setModalContent(stateDetailQuantiteExpirationBientot);
        break;

      case "❌ Expiré Aujourd'hui":
        setModalContent(stateDetailQuantiteExpirationAujourdHui);
        break;

      case "❌ Qté non détruit":
        setModalContent(stateDetailQuantiteQuantiteNonDetruite);
        break;

      case "❌ Qté détruit":
        setModalContent(stateDetailQuantiteQuantiteDetruite);
        break;

      default:
        setModalContent([]);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  // const dataPertes = [
  //   { produit: "Paracétamol", pertes: 20, expiration: 10 },
  //   { produit: "ACT", pertes: 15, expiration: 25 },
  //   { produit: "Amoxil", pertes: 30, expiration: 5 },
  //   { produit: "Ibuprofen", pertes: 10, expiration: 8 },
  // ];

  // Données mouvements et produits expirés (simplifiées)
  // const mouvementsAttente = [
  //   { id: 1, date: "2025-09-29", produit: "Paracétamol", lot: "L-12", qte: 50, type: "Entrée", magasinier: "Kassi" },
  //   { id: 2, date: "2025-09-29", produit: "ACT", lot: "L-44", qte: 10, type: "Sortie", magasinier: "Ahou" },
  // ];

  // Fonction de changement de période
  const handleChangePeriode = (e) => {
    setPeriode(e.target.value);
    // Ici, tu peux déclencher un appel API pour recharger les données en fonction de la période
  };
  // 🧾 Fonction : export PDF
  const handleExportPDF = () => {
    // const doc = new jsPDF("p", "mm", "a4");

    const doc = new jsPDF({
      orientation: "landscape", // 🔹 Met le document en paysage
      unit: "pt", // Points (plus précis pour le placement)
      format: "A4", // Format standard
    });
    // 🏷️ Titre principal
    doc.setFontSize(16);
    doc.text(modalData.title || "Rapport de Stock", 40, 40);

    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString()}`, 40, 60);

    // 🧮 Génération du tableau
    const tableColumn = ["#", "Produit", "Quantité"];
    const tableRows = modalContent.map((item, index) => [
      index + 1,
      item.produit,
      item.quantite,
    ]);

    // Ajouter la ligne de total à la fin
    tableRows.push(["", "Total", modalData.value]);

    // 🧱 Style du tableau
    autoTable(doc, {
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontSize: 12,
      },
      bodyStyles: { fontSize: 11 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 350 },
        2: { halign: "right", cellWidth: 100 },
      },
      styles: { overflow: "linebreak" },
    });

    // 📥 Enregistrement du PDF
    doc.save(`${modalData.title || "rapport-stock"}.pdf`);
  };

  // 🧾 Fonction : export Excel
  const handleExportExcel = () => {
    // 1️⃣ Création du tableau de données
    const worksheetData = [
      ["Rapport :", modalData.title || "Stock"], // titre
      ["Date :", new Date().toLocaleDateString()],
      [], // ligne vide
      ["#", "Produit", "Quantité"], // en-tête
      ...modalContent.map((item, index) => [
        index + 1,
        item.produit,
        item.quantite,
      ]),
      ["", "Total", modalData.value], // ligne total
    ];

    // 2️⃣ Création de la feuille Excel
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // 3️⃣ Mise en forme des colonnes
    worksheet["!cols"] = [
      { wch: 5 }, // #
      { wch: 40 }, // Produit
      { wch: 15 }, // Quantité
    ];

    // 4️⃣ Styles de base (⚠️ Excel n'applique pas le "vrai" style visuel sans XLSX-Style)
    // Mais on peut simuler des en-têtes en gras et fond coloré :
    const headerCell = ["A4", "B4", "C4"];
    headerCell.forEach((cell) => {
      if (worksheet[cell]) {
        worksheet[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "0070C0" } },
          alignment: { horizontal: "center" },
        };
      }
    });

    // 5️⃣ Création du classeur
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");

    // 6️⃣ Génération du fichier et téléchargement
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, `${modalData.title || "rapport-stock"}.xlsx`);
  };

  return (
    <div>
      {/* Filtres en haut */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h5>📊 Tableau de bord - Responsable de Stock</h5>
      </div>
      <div className="row mb-4 g-3">
        {/* <InfoCardTbResponsable
          title="📦 Stock dispo"
          value={stateQteDisponible?.quantiteDisponibleFinal}
          gradient="linear-gradient(135deg, #4CAF50, #81C784)"
          handleOpenModal={handleOpenModal}
        /> */}
        <InfoCardTbResponsable
          title="📦 Stock dispo"
          value={stateQteDisponible?.quantiteDisponibleFinal}
          gradient="linear-gradient(135deg, #4CAF50, #81C784)"
          handleOpenModal={handleOpenModal}
        />
        <InfoCardTbResponsable
          title="⚠️ Qté En attente"
          value={stateQteEnAttente?.totalAttente}
          gradient="linear-gradient(135deg, #FF9800, #FFB74D)"
          handleOpenModal={handleOpenModal}
        />
        <InfoCardTbResponsable
          title="⏳ Qté Bientôt expiré"
          value={stateQteExpire?.quantiteBientotExpirer}
          gradient="linear-gradient(135deg, #2196F3, #64B5F6)"
          handleOpenModal={handleOpenModal}
        />
        <InfoCardTbResponsable
          title="❌ Expiré Aujourd'hui"
          value={stateQteExpire?.quantiteExpirerAujourdhui}
          gradient="linear-gradient(135deg, hsla(192, 83%, 54%, 1.00), #13a5c2ff)"
          handleOpenModal={handleOpenModal}
        />
        <InfoCardTbResponsable
          title="❌ Qté non détruit"
          value={stateQteExpire?.quantiteNonDetruit}
          gradient="linear-gradient(135deg, #e07371ff, #d77e7dff)"
          handleOpenModal={handleOpenModal}
        />
        <InfoCardTbResponsable
          title="❌ Qté détruit"
          value={stateQteExpire?.quantiteDetruit}
          gradient="linear-gradient(135deg, #E53935, #EF5350)"
          handleOpenModal={handleOpenModal}
        />
      </div>
      {/* Indicateurs (KPI Cards) */}

      {/* Tableau des mouvements en attente */}
    {stateProduitInventaire.length > 0 && (
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          Produit à valider
        </div>
        <div className="card-body">
          <ControleInventaire />
        </div>
      </div>
    )}
      {/* Tableau des produits expirés */}

      {/* Graphiques */}
      <div className="row">
        <div className="col-md-12 mb-4">
          <Graphe1Quantite />
        </div>

        <div className="col-md-12 mb-4">
          <Graphe2QteExpirer />
        </div>
      </div>
      <div className="row">
        {/* <div className="col-md-6 mb-4">
          <Graphe3QteQuotidienneJrs />
          <Graphe7QteQuotidienneMois />
          <Graphe5QteQuotidienneAnnee />
        </div>
        <div className="col-md-6 mb-4">
          <Graphe4MontantQuotidienneJrs />
          <Graphe8MontantQuotidienneMois />
          <Graphe6MontantQuotidienneAnnee />
        </div> */}
        <div className="mt-2 mt-md-0 d-flex align-items-left">
          <label className="me-2 fw-bold">Filtrer par :</label>
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={periode}
            onChange={handleChangePeriode}
          >
            <option value="jour">Jour</option>
            <option value="mois">Mois</option>
            <option value="annee">Année</option>
          </select>
        </div>
        <br />
        <br />
        <div className="col-md-6 mb-4">
          {periode === "jour" && <Graphe3QteQuotidienneJrs />}
          {periode === "mois" && <Graphe7QteQuotidienneMois />}
          {periode === "annee" && <Graphe5QteQuotidienneAnnee />}
        </div>

        <div className="col-md-6 mb-4">
          {periode === "jour" && <Graphe4MontantQuotidienneJrs />}
          {periode === "mois" && <Graphe8MontantQuotidienneMois />}
          {periode === "annee" && <Graphe6MontantQuotidienneAnnee />}
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-12 mb-4">
          <Graphe6ProduitPlusVendu />
        </div>
      </div> */}
      {/* 🪟 MODAL DYNAMIQUE */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        dialogClassName="custom-modal"
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Modal.Title style={{ fontSize: "14px" }}>
              {modalData.title}
            </Modal.Title>
            <h5 className="m-0"></h5>
            <div>
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={handleExportPDF}
              >
                <i className="bi bi-file-earmark-pdf"></i> PDF
              </button>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={handleExportExcel}
              >
                <i className="bi bi-file-earmark-excel"></i> Excel
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* <p>
            <strong>Valeur totale :</strong> {modalData.value}
          </p> */}

          {modalContent.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr
                  style={{
                    fontSize: "12px",
                    lineHeight: "1",
                    fontWeight: "bold",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  <th
                    style={{
                      width: "5%",
                      textAlign: "center",
                      border: "1px solid black",
                    }}
                  >
                    #
                  </th>
                  <th style={{ width: "5%", border: "1px solid black" }}>
                    Produit
                  </th>
                  {/* {modalContent.some((item) => item.dateExpiration) && (
                    <th>Date d’expiration</th>
                  )} */}
                  <th style={{ width: "5%", border: "1px solid black" }}>
                    Quantité
                  </th>
                </tr>
              </thead>
              <tbody>
                {modalContent.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      fontSize: "12px",
                      lineHeight: "1",
                      fontWeight: "bold",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    <td
                      style={{
                        width: "5%",
                        textAlign: "center",
                        border: "1px solid black",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td style={{ width: "90%", border: "1px solid black" }}>
                      {item.produit}
                    </td>
                    {/* {item.dateExpiration && <td>{item.dateExpiration}</td>} */}
                    <td
                      style={{ textAlign: "right", border: "1px solid black" }}
                    >
                      {item.quantite}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    colSpan="2"
                    className="text-end"
                    style={{
                      fontSize: "12px",
                      lineHeight: "1",
                      fontWeight: "bold",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    Total :
                  </th>
                  <th style={{ textAlign: "right", border: "1px solid black" }}>
                    {modalData.value}
                  </th>
                </tr>
              </tfoot>
            </Table>
          ) : (
            <p>Aucune donnée à afficher.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardResponsable;
