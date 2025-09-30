// src/components/DashboardResponsable.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const DashboardResponsable = () => {
  // État pour la période sélectionnée
  const [periode, setPeriode] = useState("mois");

  // Données fictives
  const dataConsommation = [
    { mois: "Jan", consommation: 400 },
    { mois: "Fév", consommation: 300 },
    { mois: "Mar", consommation: 500 },
    { mois: "Avr", consommation: 700 },
    { mois: "Mai", consommation: 200 },
    { mois: "Juin", consommation: 450 },
  ];

  const dataPertes = [
    { produit: "Paracétamol", pertes: 20, expiration: 10 },
    { produit: "ACT", pertes: 15, expiration: 25 },
    { produit: "Amoxil", pertes: 30, expiration: 5 },
    { produit: "Ibuprofen", pertes: 10, expiration: 8 },
  ];

  // Données mouvements et produits expirés (simplifiées)
  const mouvementsAttente = [
    { id: 1, date: "2025-09-29", produit: "Paracétamol", lot: "L-12", qte: 50, type: "Entrée", magasinier: "Kassi" },
    { id: 2, date: "2025-09-29", produit: "ACT", lot: "L-44", qte: 10, type: "Sortie", magasinier: "Ahou" },
  ];

  const produitsExpires = [
    { id: 1, produit: "Amoxil", lot: "L-55", qte: 20, expiration: "2025-09-28" },
    { id: 2, produit: "ACT", lot: "L-77", qte: 15, expiration: "2025-10-01" },
  ];

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
          <select className="form-select" style={{ width: "200px" }} value={periode} onChange={handleChangePeriode}>
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
              <p className="card-text display-6 fw-bold">12,450</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⚠️ En attente</h5>
              <p className="card-text display-6 fw-bold">8</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⏳ Bientôt expiré</h5>
              <p className="card-text display-6 fw-bold">320</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">❌ Expiré</h5>
              <p className="card-text display-6 fw-bold">120</p>
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
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Produit</th>
                <th>Lot</th>
                <th>Qté</th>
                <th>Type</th>
                <th>Magasinier</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mouvementsAttente.map((mvt) => (
                <tr key={mvt.id}>
                  <td>{mvt.date}</td>
                  <td>{mvt.produit}</td>
                  <td>{mvt.lot}</td>
                  <td>{mvt.qte}</td>
                  <td>{mvt.type}</td>
                  <td>{mvt.magasinier}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">✅ Valider</button>
                    <button className="btn btn-danger btn-sm">❌ Rejeter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableau des produits expirés */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-danger text-white">
          Produits expirés
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Lot</th>
                <th>Qté</th>
                <th>Date Expiration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {produitsExpires.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.produit}</td>
                  <td>{prod.lot}</td>
                  <td>{prod.qte}</td>
                  <td>{prod.expiration}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">🔄 Quarantaine</button>
                    <button className="btn btn-danger btn-sm">❌ Détruire</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphiques */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              📊 Consommation ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataConsommation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="consommation" stroke="#007bff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              📉 Pertes & Expirations ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataPertes}>
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
