// src/components/DashboardCaissier.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const DashboardCaissier = () => {
  const [periode, setPeriode] = useState("jour");

  // Données fictives
  const ventesJour = [
    { id: 1, produit: "Paracétamol", lot: "L-12", qte: 2, prix: 200, total: 400, mode: "Espèces" },
    { id: 2, produit: "ACT", lot: "L-44", qte: 1, prix: 500, total: 500, mode: "Mobile Money" },
    { id: 3, produit: "Ibuprofen", lot: "L-33", qte: 3, prix: 150, total: 450, mode: "Crédit" },
  ];

  const dataChiffreAffaire = [
    { mois: "Jan", ca: 2000 },
    { mois: "Fév", ca: 3200 },
    { mois: "Mar", ca: 2800 },
    { mois: "Avr", ca: 5000 },
    { mois: "Mai", ca: 4500 },
  ];

  const dataPaiements = [
    { mode: "Espèces", valeur: 3500 },
    { mode: "Mobile Money", valeur: 2000 },
    { mode: "Crédit", valeur: 1200 },
  ];
  const COLORS = ["#28a745", "#007bff", "#ffc107"];

  // Changement de période
  const handleChangePeriode = (e) => {
    setPeriode(e.target.value);
    // Ici : appel API backend avec ?periode=jour/mois/trimestre
  };

  return (
    <div className="container mt-4">
      {/* Filtres */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>💰 Tableau de bord - Caissier</h3>
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

      {/* Indicateurs */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🛒 Ventes {periode}</h5>
              <p className="card-text display-6 fw-bold">58</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💵 Recettes {periode}</h5>
              <p className="card-text display-6 fw-bold">9,800 FCFA</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📲 Mobile Money</h5>
              <p className="card-text display-6 fw-bold">2,000 FCFA</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">❌ Crédits</h5>
              <p className="card-text display-6 fw-bold">1,200 FCFA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des ventes */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-success text-white">
          Ventes {periode}
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Lot</th>
                <th>Qté</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
                <th>Mode Paiement</th>
              </tr>
            </thead>
            <tbody>
              {ventesJour.map((vente) => (
                <tr key={vente.id}>
                  <td>{vente.produit}</td>
                  <td>{vente.lot}</td>
                  <td>{vente.qte}</td>
                  <td>{vente.prix} FCFA</td>
                  <td>{vente.total} FCFA</td>
                  <td>{vente.mode}</td>
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
            <div className="card-header bg-primary text-white">
              📈 Chiffre d’affaires ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataChiffreAffaire}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ca" stroke="#28a745" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              🧾 Répartition Paiements ({periode})
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPaiements}
                    dataKey="valeur"
                    nameKey="mode"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {dataPaiements.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCaissier;
