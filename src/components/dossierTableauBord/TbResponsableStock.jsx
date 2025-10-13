// src/components/DashboardResponsable.jsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControleInventaire from "../../pages/dossierResponsable/ControleInventaire";
import { useLogiqueTbResponsableStock } from "./logiqueTbResponsableStock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import InfoCardTbResponsable from "./InfoCardTbResponsable";

const DashboardResponsable = () => {
  const {
    stateQteDisponible,
    stateQteEnAttente,
    stateQteExpire,
    stateQteRentrantParMois,
    stateProduitExpire,
  } = useLogiqueTbResponsableStock();
  // État pour la période sélectionnée
  const [periode, setPeriode] = useState("mois");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", value: 0 });
  const handleOpenModal = (title, value) => {
    setModalData({ title, value });
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

  return (
    <div>
      {/* Filtres en haut */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>📊 Tableau de bord - Responsable de Stock</h4>
        <div className="d-flex align-items-center">
          <label className="me-2 fw-bold">Filtrer par :</label>
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={periode}
            onChange={handleChangePeriode}
          >
            <option value="jour">Jour</option>
            <option value="mois">Mois</option>
            <option value="trimestre">Trimestre</option>
            <option value="annee">Année</option>
          </select>
        </div>
      </div>
      <div className="row mb-4 g-3">
        <InfoCardTbResponsable
          title="📦 Stock dispo"
          value={stateQteDisponible?.quantiteDisponibleFinal}
          gradient="linear-gradient(135deg, #4CAF50, #81C784)"
        />
        <InfoCardTbResponsable
          title="⚠️ Qté En attente"
          value={stateQteEnAttente?.totalAttente}
          gradient="linear-gradient(135deg, #FF9800, #FFB74D)"
        />
        <InfoCardTbResponsable
          title="⏳ Qté Bientôt expiré"
          value={stateQteExpire?.quantiteBientotExpirer}
          gradient="linear-gradient(135deg, #2196F3, #64B5F6)"
        />
        <InfoCardTbResponsable
          title="❌ Expiré Aujourd'hui"
          value={stateQteExpire?.quantiteExpirerAujourdhui}
          gradient="linear-gradient(135deg, hsla(192, 83%, 54%, 1.00), #13a5c2ff)"
        />
        <InfoCardTbResponsable
          title="❌ Qté non détruit"
          value={stateQteExpire?.quantiteNonDetruit}
          gradient="linear-gradient(135deg, #e07371ff, #d77e7dff)"
        />
        <InfoCardTbResponsable
          title="❌ Qté détruit"
          value={stateQteExpire?.quantiteDetruit}
          gradient="linear-gradient(135deg, #E53935, #EF5350)"
        />
      </div>
      {/* Indicateurs (KPI Cards) */}
     

      {/* Tableau des mouvements en attente */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          Mouvements à valider
        </div>
        <div className="card-body">
          <ControleInventaire />
        </div>
      </div>

      {/* Tableau des produits expirés */}

      {/* Graphiques */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              📊 Quantité en stock par ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stateQteRentrantParMois}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* 🟢 Courbe des quantités entrantes */}
                  <Line
                    type="monotone"
                    dataKey="qte_rentree"
                    stroke="#007bff" // Bleu
                    strokeWidth={3}
                    name="Quantité Entrée"
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />

                  {/* 🔴 Courbe des quantités sortantes */}
                  <Line
                    type="monotone"
                    dataKey="qte_sortie"
                    stroke="#ff4d4d" // Rouge
                    strokeWidth={3}
                    name="Quantité Sortie"
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              📉 Quantité : Perdu && Expiré
              {/* ({periode}) */}
            </div>
            <div className="card-body">
              {/* <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateProduitExpire}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produit" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pertes" fill="#dc3545" name="Pertes" />
                  <Bar dataKey="expiration" fill="#ffc107" name="Expiration" />
                </BarChart>
              </ResponsiveContainer> */}

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={stateProduitExpire}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produit" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="qteInitial" stackId="b" fill="#007bff" />
                  
                  <Bar dataKey="qteexpiration" stackId="a" fill="#f08a0dff" />
                  <Bar dataKey="qtepertes" stackId="a" fill="#0a8d3cff" />
                  <Bar dataKey="qteDisponible" stackId="a" fill="#ef0909ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Détails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{modalData.title}</h5>
          <p>Valeur : {modalData.value}</p>
          {/* Ici tu peux ajouter un tableau ou plus d’infos dynamiques */}
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
