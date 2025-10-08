// src/components/DashboardResponsable.jsx
import React, { useState } from "react";
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

const DashboardResponsable = () => {
  const { stateQteDisponible, stateQteEnAttente, stateQteExpire,stateQteRentrantParMois,stateProduitExpire } =
    useLogiqueTbResponsableStock();
  // État pour la période sélectionnée
  const [periode, setPeriode] = useState("mois");

  

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
    <div className="container mt-4">
      {/* Filtres en haut */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📊 Tableau de bord - Responsable de Stock</h3>
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

      {/* Indicateurs (KPI Cards) */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📦 Stock dispo</h5>
              <p className="card-text display-6 fw-bold">
                {stateQteDisponible?.quantiteDisponibleFinal}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⚠️ Qté En attente</h5>
              <p className="card-text display-6 fw-bold">
                {stateQteEnAttente?.totalAttente}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⏳ Qté Bientôt expiré</h5>
              <p className="card-text display-6 fw-bold">
                {stateQteExpire?.quantiteBientotExpirer}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">❌ Qté Expiré</h5>
              <p className="card-text display-6 fw-bold">
                {stateQteExpire?.quantiteDejaExpirer}
              </p>
            </div>
          </div>
        </div>
      </div>

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
              📊 Quantité entrée en stock par ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stateQteRentrantParMois}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="qte_rentre"
                    stroke="#007bff"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              📉 Pertes & Expirations 
              {/* ({periode}) */}
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateProduitExpire}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produit" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pertes" fill="#dc3545" name="Pertes" />
                  <Bar dataKey="expiration" fill="#ffc107" name="Expiration" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardResponsable;
