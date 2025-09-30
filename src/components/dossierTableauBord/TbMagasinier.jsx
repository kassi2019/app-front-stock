// src/components/DashboardMagasinier.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";

const DashboardMagasinier = () => {
  const [periode, setPeriode] = useState("jour");

  // Données fictives
  const mouvements = [
    { id: 1, date: "2025-09-29", produit: "Paracétamol", type: "Entrée", qte: 200 },
    { id: 2, date: "2025-09-29", produit: "ACT", type: "Sortie", qte: 50 },
    { id: 3, date: "2025-09-29", produit: "Ibuprofen", type: "Entrée", qte: 150 },
  ];

  const dataStocks = [
    { produit: "Paracétamol", stock: 300 },
    { produit: "ACT", stock: 80 },
    { produit: "Amoxil", stock: 120 },
    { produit: "Ibuprofen", stock: 200 },
  ];

  const dataMouvements = [
    { mois: "Jan", entrees: 1000, sorties: 800 },
    { mois: "Fév", entrees: 1200, sorties: 950 },
    { mois: "Mar", entrees: 1500, sorties: 1100 },
    { mois: "Avr", entrees: 900, sorties: 1200 },
    { mois: "Mai", entrees: 1400, sorties: 1000 },
  ];

  // Changement période
  const handleChangePeriode = (e) => {
    setPeriode(e.target.value);
    // Ici on ferait un appel API backend pour filtrer
  };

  return (
    <div className="container mt-4">
      {/* Filtres */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📦 Tableau de bord - Magasinier</h3>
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

      {/* Indicateurs */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">✅ Entrées {periode}</h5>
              <p className="card-text display-6 fw-bold">1,200</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📤 Sorties {periode}</h5>
              <p className="card-text display-6 fw-bold">850</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⚠️ Ruptures</h5>
              <p className="card-text display-6 fw-bold">3 Produits</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⏳ En attente validation</h5>
              <p className="card-text display-6 fw-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau mouvements */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          Mouvements saisis ({periode})
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Produit</th>
                <th>Type</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {mouvements.map((mvt) => (
                <tr key={mvt.id}>
                  <td>{mvt.date}</td>
                  <td>{mvt.produit}</td>
                  <td>{mvt.type}</td>
                  <td>{mvt.qte}</td>
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
              📊 Stocks par produit
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataStocks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="produit" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#007bff" name="Stock actuel" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              📈 Entrées vs Sorties ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataMouvements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="entrees" stroke="#28a745" strokeWidth={3} />
                  <Line type="monotone" dataKey="sorties" stroke="#dc3545" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMagasinier;
