import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function DashboardStock() {
  // 📊 Données fictives (remplace-les par ton API/DB)
  const stats = {
    totalProduits: 1250,
    produitsRupture: 5,
    produitsCritiques: 12,
    valeurStock: 3200000, // en FCFA
  };

  const produitsParCategorie = [
    { name: "Médicaments", value: 500 },
    { name: "Alimentaire", value: 300 },
    { name: "Informatique", value: 200 },
    { name: "Hygiène", value: 250 },
  ];

  const topSorties = [
    { name: "Paracétamol", sorties: 120 },
    { name: "Riz 25kg", sorties: 90 },
    { name: "Laptop HP", sorties: 40 },
    { name: "Gel Hydroalcoolique", sorties: 30 },
    { name: "Antibiotique", sorties: 25 },
  ];

  const produitsAlertes = [
    { name: "Amoxicilline", type: "Périmé", quantite: 50 },
    { name: "Riz 5kg", type: "Proche expiration", quantite: 20 },
    { name: "Laptop Lenovo", type: "Stock bas", quantite: 2 },
  ];

  const COLORS = ["#1E40AF", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📊 Tableau de bord - Gestion de stock</h2>

      {/* 🔹 Cartes Statistiques */}
      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 bg-primary text-white h-100">
            <h5>Total Produits</h5>
            <h2>{stats.totalProduits}</h2>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 bg-danger text-white h-100">
            <h5>Produits en Rupture</h5>
            <h2>{stats.produitsRupture}</h2>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 bg-warning text-dark h-100">
            <h5>Produits Critiques</h5>
            <h2>{stats.produitsCritiques}</h2>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm p-3 bg-success text-white h-100">
            <h5>Valeur du Stock</h5>
            <h2>{stats.valeurStock.toLocaleString()} FCFA</h2>
          </div>
        </div>
      </div>

      {/* 🔹 Graphiques */}
      <div className="row">
        {/* Répartition par catégorie */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="text-center mb-3">Répartition du stock par catégorie</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={produitsParCategorie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {produitsParCategorie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 sorties */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="text-center mb-3">Top 5 produits sortis ce mois</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSorties}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sorties" fill="#1E40AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 🔹 Tableau des alertes */}
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">⚠️ Produits en alerte</h5>
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Produit</th>
                  <th>Type d’alerte</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {produitsAlertes.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
