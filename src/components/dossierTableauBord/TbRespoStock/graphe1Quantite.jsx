import React from "react";
import { useSelector } from "react-redux";
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

function Graphe1Quantite() {
  const { stateQteRentrantParMois } = useSelector((state) => state.tableauBord);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        📊 Tendance des quantités par mois
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

            {/* 🔴 Courbe des quantités vendu */}
            <Line
              type="monotone"
              dataKey="qte_vendu"
              stroke="#086905ff" // Rouge
              strokeWidth={3}
              name="Quantité vendue"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            {/* 🔴 Courbe des quantités perdu */}
            <Line
              type="monotone"
              dataKey="qte_perdu"
              stroke="#131210ff" // Rouge
              strokeWidth={3}
              name="Quantité Perdue"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            {/* 🔴 Courbe des quantités perdu */}
            <Line
              type="monotone"
              dataKey="qte_expire"
              stroke="#0c15c1ff" // Rouge
              strokeWidth={3}
              name="Quantité Expirée"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            {/* 🔴 Courbe des quantités detruite */}
            <Line
              type="monotone"
              dataKey="qte_detruire"
              stroke="#f30e62ff" // Rouge
              strokeWidth={3}
              name="Quantité Detruite"
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe1Quantite;
